 const jwt=require("jsonwebtoken");
 const User=require("../models/user")
 const userAuth=async (req,res,next)=>{
     try{
        // read the token from the req cookies
        const {token}=req.cookies;
        if(!token){
            return res.status(401).send("please login!");
        }
        const decodedObj=await jwt.verify(token,process.env.JWT_SECRET);
    
        const {_id}= decodedObj;
    
        const user= await User.findOne({_id: _id});
        if(!user){
            throw new Error("user not found");
        }
        req.user=user;
        next();

    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
}

module.exports ={userAuth};