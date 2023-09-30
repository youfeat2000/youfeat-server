const User = require('../schema/userSchema')
const bcrypt = require('bcrypt')

const handleChangePassword = async(req, res)=>{
    const { code, password} = req.body
    console.log(code)
    const user =await User.findOne({ code })
    if(!user) return res.sendStatus(401)
    console.log(user)

    try{
        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        User.findOneAndUpdate({code}, {password: hashedPassword, code: 000000})
        .then(data=> res.sendStatus(200))
    }catch (err){
        res.sendStatus(400)
    }
}

module.exports = handleChangePassword