const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{type:String, required:true, unique:true},
        email:{type:String, required:true, unique: true},
        password:{type:String, required: true},
        isAdmin:{
            type: Boolean, 
            default: false,
        },
    },
    {timestamps: true} //mongoDB function which will create time and date of user creation
);

module.exports = mongoose.model("User", UserSchema);