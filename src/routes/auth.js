const express=require("express");
const { validateSignUpData } = require("../utility/Validation");
const authRouter=express.Router();
const bcrypt= require("bcrypt");
const User = require("../models/user");
const validator=require("validator");

// creating a new user
authRouter.post("/signup", async(req,res)=>{
    try{
        // validation of data
        validateSignUpData(req);
        const{firstName,lastName,emailId,password,age}=req.body;

        // encryption of password
        const passwordHash=await bcrypt.hash(password,10);

        // creating a new instance of the user
        const user=new User({
            firstName,
            lastName,
            emailId,
            age,
            password:passwordHash
        })

        await user.save();
        res.send("user added succesfully");

    }
    catch(err){
        res.status(400).send("Error: "+ err.message);
    }

})

// login api
authRouter.post("/login", async(req,res)=>{
    const{emailId,password}=req.body;
    try{
        validator.isEmail(emailId);
        const user= await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            // creation of token --(you can expire your cookies as well)
            const token = await user.getJWT();

            // adding the token inside a cookie and send response to the server
            res.cookie("token", token,{
                expires:new Date(Date.now()+ 8*3600000),
            })
            res.send("login succesfully");
        }
        else{
            throw new Error("Invalid credentials");
        }
    }
    catch(err){
        res.status(400).send("something went wrong: "+ err.message)
    }
})

// logout api
authRouter.post("/logout", async (req,res)=>{
    res.cookie("token", null,{
        expires: newDate(Date.now()),
    });
    res.send("log out successfully");
})

module.exports=authRouter;