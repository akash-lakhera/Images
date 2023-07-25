const express = require("express");
const session = require("express-session");
const passport = require("passport");
const conn = require("./db");
const path = require("path");
const app = express();
const{register}=require("./Controllers/register")
const User = require("./models/user");
const {
  S3Client,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: "ap-south-1",
  signer: {
    sign: async (request) => request,
  },
});
const mongoose = require("mongoose");
port = process.env.PORT || 4000;
errorHandlerMid = require("./error");
app.use((req, res, next) => {
  next();
});
app.use(express.json()); //parse json
app.use(express.static(path.join(__dirname, "build"), { index: false }));
const MongoStore = require("connect-mongo")(session);
let sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
const checkAuth = (req, res, next) => {
  //checks logged in status of a user
  if (req.isAuthenticated()) {
    next();
  } else res.status(401).send("Unauthorised");
};
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
require("./auth/passport2");
require("./auth/passport");

const pathLogger = (req, res, next) => {
  console.log(req.url);
  next();
};
app.use(pathLogger);
app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/google/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dash",
    failureRedirect: "/login",
  })
);
app.post("/api/login", passport.authenticate("local"), (req, res, next) => {
  if (req.user.username)
    res.status(200).send(JSON.stringify({ message: "deez" }));
  else
    res
      .status(401)
      .send(JSON.stringify({ Error: new Error("wrong credentials") }));
});

app.get("/api/user", (req, res, next) => {
  console.log(req.user)
  if (req.user)
    res.status(200).send(
      JSON.stringify({
        username: req.user.username,
      })
    );
  else res.status(401).send("unauthorised");
});
app.get("/aws/data", async (req, res, next) => {
  const command = new ListObjectsV2Command({
    Bucket: "testbucketfp",
  });

  try {
    const response = await client.send(command);
    let images= response.Contents.map((elem)=>{
      return "https://testbucketfp.s3.amazonaws.com/"+elem.Key
    })
   
    res.status(200).send({images:images})
  } catch (err) {
    console.error(err);
    res.status(400).send({error:"could not fetch"})
  }
});
app.post("/api/register",register)
app.get("*", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "build", "index.html"));
});
app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send({ msg: "successful" });
  });
});
app.use(errorHandlerMid);
//start the server if database is connected
conn
  .then(() => {
    app.listen(port, () => {
      console.log("server on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
