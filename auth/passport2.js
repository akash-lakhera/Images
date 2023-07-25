const passport=require('passport');
const mongoose=require('mongoose')
const User = require('../models/user2');
const passportGoogle =require('passport-google-oauth2').Strategy;
require('dotenv').config()
passport.use(new passportGoogle({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"http://localhost:4000/google/callback",
    passReqToCallback:true
},async function (request,accessToken,refreshToken,profile,done){
  let result= await User.findOneAndUpdate(
      { id: profile.id },
      {
        $setOnInsert: { id:profile.id,name:profile.name.givenName }
      },
      {
         projection:{id:1,name:1},
         new: true,   // return new doc if one is upserted
         upsert: true // insert the document if it does not exist
      }
    )
console.log("PASSPORT USER CREATION/LOGIN")
   done(null,{id:result.id,username:result.name})   
}))
 passport.serializeUser((user,done)=>{
   console.log("serialize")
    done(null,user)

 })
 passport.deserializeUser(async(user,done)=>{
   console.log("deserialize")
    
    done(null,user)
 })