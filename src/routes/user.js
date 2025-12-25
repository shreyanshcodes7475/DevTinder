const express=require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter=express.Router();

const safeData="firstName  lastName age gender about photourl";

// api for getting all the request received
userRouter.get("/user/request/received", userAuth, async (req,res)=>{
    try{
        const loggedInUser=req.user._id;

        const ConnectionRequests=await ConnectionRequestModel.find({
            toUserId: loggedInUser,
            status: "Interested"
        }).populate("fromUserId", safeData)

        if(ConnectionRequests.length==0){
            return res.json({
                message: "No connection request!"
            })
        }

        res.json({
            message: "Connection Request fetched Succesfully",
            ConnectionRequests
        })
    }
    catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})

// fetching all the connection 
userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
        const loggedInUser=req.user._id;

        const connections=await ConnectionRequestModel.find({
            $or: [
                {toUserId:loggedInUser, status: "Accepted"},
                {fromUserId: loggedInUser, status: "Accepted"},
                ]
        }).populate("fromUserId", safeData )
          .populate("toUserId", safeData)

        if(connections.length==0){
            return res.json({
                message: "No connection, Intereact with people more "
            })
        }

        const data=connections.map((key)=>{
            // you can't compare two moongoose id by == operator
            if(key.fromUserId._id.equals(loggedInUser)) return key.toUserId;
            else {
                return key.fromUserId;
            }
        })

        res.json({
            message: "connection request fetched successfully",
            data
        })
    }
    catch(err){
        res.status(400).send("Error: "+ err.message)
    }
})

// User should see all cards except
// his own 
// all the profile which are are present in connection db

// feed-----
userRouter.get("/user/feed", userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit>50? 50: limit;
        const skip=(page-1)*limit;
        const connection=await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id},
                {fromUserId: loggedInUser._id}
            ]
        })

        const hiderUserFromFeed= new Set();
        connection.forEach((user)=>{
            hiderUserFromFeed.add(user.fromUserId.toString());
            hiderUserFromFeed.add(user.toUserId.toString());

        })
        
        const users=await User.find({
            $and: [
                {_id:{$nin: Array.from(hiderUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(safeData).skip(skip).limit(limit);

        res.json({
            message:"Feed Users",
            users
        })
    
    }
    catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})


module.exports=userRouter;