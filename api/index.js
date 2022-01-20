
const express = require("express");
const app = express();
//Connect to Mongo server
const mongoose = require("mongoose");
//Importing env library to pass hidden info
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");



dotenv.config(); //configuration of the library

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Database conntected")).catch((err)=>{console.log(err)
});

//REST API, importing the created userRoute not to pass all the end-points
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


//giving the express server a port 
app.listen(3001, ()=>{
    console.log(" Server running correctly")
});

