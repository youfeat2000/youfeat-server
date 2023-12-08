const User = require('../schema/userSchema')
const crypto = require("crypto")

const handleChangePassword = async(req, res)=>{
    const { code, password} = req.body
    const user =await User.findOne({ code })
    if(!user) return res.sendStatus(401)

    try{
        const salt = crypto.randomBytes(16).toString('hex');
        const iterations = 100000; // You can adjust this based on your security requirements
        const keylen = 64; // Key length in bytes
        const digest = 'sha512'; // Hashing algorithm

        const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');

        User.findOneAndUpdate({code}, {password: hashedPassword, salt, code: 100000,})
        .then(data=> res.sendStatus(200))
    }catch (err){
        res.sendStatus(400)
    }
}

module.exports = handleChangePassword