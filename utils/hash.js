const cr=require('crypto')

const genHash=(password)=>{
let salt = cr.randomBytes(32).toString('hex')
let hash=cr.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
return{
    salt:salt,
    hash:hash
}
}
const checkHash=(password,hash,salt)=>{
    let hashCalculate=cr.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    return hashCalculate===hash
}

module.exports={genHash,checkHash}