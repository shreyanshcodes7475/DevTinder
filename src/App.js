const express= require("express");
const app= express();
const connectDB =require("./utility/database")
const User=require("./models/user")

// its a middleware which  will run first for all type of routes and request - it can read body/json object
app.use(express.json());
app.post("/signUp", async (req,res)=>{

    const user=new User(req.body);
    try{
        await user.save();
        res.send("user added succesfully");
    }
    catch(err){
        res.status(400).send("error occured during saving data to databasae");
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
        res.status(400).send("something went wrong")
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
    res.status(400).send("something went wrong")
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
