const express=require("express");
const {userAuth}= require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User =require("../models/user")
const requestRouter=express.Router();

// sending a Connection request (status: interested , Ignored)
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
    // sending a connection request
    try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    const toUser=await User.findOne({_id: toUserId});
    if(!toUser){
        return res.status(400).json({
            message: "This userId does not exist"
        })
    }


    const allowedStatus= ["Interested", "Ignored"];
    if(!allowedStatus.includes(status)){
        throw new Error("Invalid status type" + status );
    }


    const existingConnectionRequest= await ConnectionRequestModel.findOne({
        $or:[
            {fromUserId, toUserId},  // it will prevent more than one request from one acc to that particular acc
            {fromUserId: toUserId, toUserId: fromUserId} // it will ensure if i sent req to purvi then purvi can't sent request to me 
        ]
    })

    if(existingConnectionRequest){
        return res.status(400).json({
            message: "connection request already sent"
        })
    }


    const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status
    })

    const data= await connectionRequest.save(); 
    res.json({
        message: req.user.firstName + "sent you a connection request",
        data
    })

    }
    catch(err){
        res.status(400).json({
            message: err.message

        })
    }

})

// reviewing a connection request(status:Accepted and Rejected)
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
    try{
        const {requestId, status}= req.params;
        const allowedStatus=["Accepted", "Rejected"];
        const loggedInUser=req.user;
        
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message: `${status}, is not allowed`
            })
        }

        const connectionRequest= await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId:loggedInUser._id,
            status: "Interested"
        })

        if(!connectionRequest){
            return res.status(400).json({
                message: "Connection request does not found"
            })
        }
        
        connectionRequest.status=status;
        const data= await connectionRequest.save();

        res.status(200).json({
            message: "Request" + status + "succesfully",
            data
        })
    }
    catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})


module.exports=requestRouter;