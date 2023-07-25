const mongoose=require('mongoose')
const user=new mongoose.Schema({
    id:String,name:String
})
module.exports=mongoose.model('google',user)
