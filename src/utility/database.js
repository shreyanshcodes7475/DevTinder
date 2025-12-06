    const mongoose=require("mongoose");

    const connectDB =async ()=>{
        await mongoose.connect(
                "mongodb+srv://shreyanshgupta8319:woTLF6jL20ntu1bP@cluster0.goizklc.mongodb.net/devTinder"
        );
    }

    module.exports=connectDB;