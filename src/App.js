const express= require("express");
const app= express();
const connectDB =require("./config/database")
const User=require("./models/user");
const { validateSignUpData } = require("./utility/Validation");
const bcrypt=require('bcrypt');
const validator=require("validator");
const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middleware/auth")
const authRouter=require("./routes/auth");
const requestRouter=require("./routes/request");
const profileRouter=require("./routes/profile");
const userRouter=require("./routes/user")
const cors=require("cors");


// its a middleware which  will run first for all type of routes and request - it can read body/json object
app.use(cors({
  // your backend should know where is your frontend otherwise due to diffrent origin browser will never allow you to set cookie
    origin: "http://localhost:5173", // frontend url
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);



connectDB().then(()=>{
        console.log("database connection established..");
        app.listen(3000, () => {
          console.log(`Server is running at http://localhost:${3000}`);
        });
        
    }).catch((err)=>{
        console.error("database cannot be connected");
    })