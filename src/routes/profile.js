const express=require("express");
const { userAuth } = require("../middleware/auth");
const { validateSignUpData, validateProfileEditData } = require("../utility/Validation");
const profileRouter=express.Router();
const validator=require("validator");
const bcrypt= require("bcrypt");

// profile view api
profileRouter.get("/profile/view",userAuth,(req,res)=>{
    try{
        res.send(req.user);
    }
    catch(err){
        res.status(400).send("Error:"+ err.message);
    }
} )

// profile edit api
profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{

    try{
        if(!validateProfileEditData(req)){
        throw new Error ("Invalid edit request");
        }
    const loggedInUser =req.user;
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    await loggedInUser.save();

    res.json({
        message: `${loggedInUser.firstName}, your profile has been updates succesfully `,
        data: loggedInUser,
    });
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

})

// profile edit password api
profileRouter.patch("/profile/password", userAuth, async (req,res)=>{
    try{
        const loggedInUser=req.user;
        console.log(loggedInUser.password);
        const newPassword=req.body.password;
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Your new password isn't strong");
        }
         const newPasswordHash=await bcrypt.hash(newPassword,10);
         loggedInUser.password=newPasswordHash;
         await loggedInUser.save();
         console.log(loggedInUser.password);
         

         res.status(200).json({
            message: "your password has been updated succesfully",
         })
    }
    catch(err){
        res.send("Error: "+ err.message);
    }
})



module.exports=profileRouter;