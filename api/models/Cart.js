const mongoose = require("mongoose");

const   CartSchema = new mongoose.Schema(
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
        
    },
    {timestamps: true} //mongoDB function which will create time and date of user creation
);

module.exports = mongoose.model("Cart", CartSchema);