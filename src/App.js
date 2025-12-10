const express= require("express");
const app= express();
const connectDB =require("./utility/database")
const User=require("./models/user")

// its a middleware which  will run first for all type of routes and request - it can read body/json object
app.use(express.json());

// creating a new user 
app.post("/signUp", async (req,res)=>{

    const user=new User(req.body);
    try{
        await user.save();
        res.send("user added succesfully");
    }
    catch(err){
        res.status(400).send("something went wrong"+ err.message);
    }
})

// finding user by email
app.get("/getUser", async (req,res)=>{
    const useremail= req.body.emailId;

    try{
        const users=await User.find({emailId: useremail});
        if(users.length!=0) res.send(users);
        else res.status(403).send("user not found");
    }
    catch(err){
        console.error(err.message);
        res.status(400).send("something went wrong"+ err.messag)
    }
})

// feed : showinng all the user
app.get("/feed", async (req,res)=>{
    try{
        const users=await User.find({});
        if(users.length!=0) res.send(users);
        else res.status(403).send("there is no users in database");
    }
    catch(err){
    console.error(err.message);
    res.status(400).send("something went wrong"+ err.message)
    }
})

// create a delete user api by id---
app.delete("/deleteUser", async (req,res)=>{
    const userId= req.body._id;

    try{
        // await User.findByIdAndDelete({_id: userId})      
        await User.findByIdAndDelete(userId);
        res.send("userd deleted succesfully");
    }
    catch(err){
        res.status(400).send("something went wrong"+ err.message);
    }
})

// update a user by email id
app.patch("/updateUser", async (req,res)=>{
    const userEmailId=req.body.emailId;
    const data=req.body;

    try{
    const user=await User.findOneAndUpdate({emailId: userEmailId}, data,{
        returnDocument: "after",
        runValidators: true,

    });
    console.log(user); // by default it will give user data before the updation and if you want after updation data set a third paramter called option set returned document : "after"\
    res.send("user updated succesfully");
    }
    catch(err){
        res.status(403).send("something went wrong"+ err.message);
    }

    
})

connectDB().then(()=>{
        console.log("database connection established..");
        app.listen(3000, () => {
          console.log(`Server is running at http://localhost:${3000}`);
        });
        
    }).catch((err)=>{
        console.error("database cannot be connected");
    })
