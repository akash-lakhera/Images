const mongoose = require("mongoose");
const users = new mongoose.Schema({
username:String,
hash:String,
salt:String
});
module.exports = mongoose.model("user", users);
// returns model for username password based user