const mongoose = require("mongoose");

const   OrderSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        products: [
            {
            productId:
            {
                type:String
            },
            quantity:
            {
                type:Number,
                default: 1,
            },
        },
    ],
        amount:{
            type:Number,
            required: true
        },
        address:{
            type:Object,
            required: true,
        },
        status:{
            type:String,
            default: "pending"
        },
    },
    {timestamps: true} //mongoDB function which will create time and date of user creation
);

module.exports = mongoose.model("Order", OrderSchema);