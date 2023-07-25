const User = require("../models/user");
const {genHash}=require("../utils/hash")

const register = async (req, res, next) => {
    const check=await User.findOne({username:req.body.username})
    if(check){
        res.status(400).send({error:"please choose another username"})
    }
    else{

        const saltHash = genHash(req.body.password);
        const { salt, hash } = saltHash;
        
        const newUser = await User.create({
    username: req.body.username,
    hash: hash,
    salt: salt,
});

res.redirect("/login")
}
};

module.exports={register}