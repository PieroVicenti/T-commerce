const router = require("express").Router();

//importing the created user model
const User = require("../models/User")
//after installing crypto-js importing it to encrypt password
const CryptoJS = require("crypto-js")
// this allows us to verify if the card belongs to the customer for example, I had to install it npm i jsonwebtoken
const jwt = require("jsonwebtoken")
//REGISTER
//post method as the user is gonna send username, pass etc.

router.post("/register", async (req, res)=>{
     const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
     });
     try{
    //method to save the sent file in our database
         const savedUser = await newUser.save();
         res.status(201).json(savedUser);
     }catch(err){
         res.status(500).json(err);
     }
});

//LOGIN

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        
        !user && res.status(401).json("Wrong username") // if username wrong

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, process.env.PASS_SEC
            );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json("Wrong password!"); // if password is wrong

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
                {expiresIn:"3d"}
            );
        
        //destructing password, in this way in the response that I send, the password is not shown
        // because even though I decrypted it, in the json file it was shown (in a decrypted way), but still shown!

        const { password, ...others } = user._doc;  //._doc necessary because of  MongoDB, it showed files in ._doc
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;