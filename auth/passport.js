const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const {checkHash}=require("../utils/hash")
passport.use(
  new LocalStrategy(async function (username, password, done) {
    let result = await User.findOne(
      { username: username },
   
      {
        username: 1,
        salt:1,
        hash:1
       
      }
    );
    if(!result)
    return done(null,false)
    const isValid=checkHash(password,result.hash,result.salt)
    
    if (isValid) done(null, result);
    else done(null, false);
  })
);
passport.serializeUser((user, done) => {

  done(null, user);
});
passport.deserializeUser(async (user, done) => {


  done(null, user);
});
