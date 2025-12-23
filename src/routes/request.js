const express=require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter=express.Router();

// sending a Connection request 
requestRouter.post("/sendConnectionRequest", userAuth,(req,res)=>{
    // sending a connection request
    const user=req.user;
    res.send(user.firstName + " has sent you a connection request"); 
})


module.exports=requestRouter;