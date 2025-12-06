const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    firstName:{
        type:String
    },

    lastName:{
    type:String
    },

    emailId:{
    type:String
    },

    age:{
    type:Number
    },

    gender:{
    type:String
    },
})

const User=mongoose.model("User", userschema);
module.exports=User;