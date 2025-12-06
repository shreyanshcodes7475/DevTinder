const express= require("express");
const app= express();
const connectDB =require("./utility/database")
const User=require("./models/user")


app.post("/signUp", async (req,res)=>{
    // creating a new instance of the user model(adding one user to our db)
    const user=new User({
        firstName: "shreyansh",
        lastName: "Gupta",
        emailId: "shreyansh.guptarewa@gmail.com",
        password: "shre@123",
    })

    // user.save returns use to save the data to db
    // thats why its an aync function
    try{
        await user.save();
        res.send("user added succesfully");
    }
    catch(err){
        res.status(400).send("error occured during saving data to databasae");
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
