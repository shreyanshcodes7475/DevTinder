    const mongoose=require('mongoose');

    const userschema=mongoose.Schema({
        firstName:{
            type:String,
            required: true,

        },

        lastName:{
            type:String,
            required: true,
        },

        emailId:{
            type:String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },

        age:{
            type:Number,
            required: true,
            min: 18

        },

        gender:{
            type:String,
            // custom validator: by default it will run for new object creation
            // if you want to make it run while updating a user so in option attributes : runvalidator: true

            validate(value){
                if(!["male", "female", "others"].includes(value)){
                    throw new Error("gender is not valid");
                }
            }
        },

        photourl:{
            type: String,
            default: "https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
        },

        skills:{
            type: [String],
        },
    },
        {
            timestamps: true,
        }
    )

    const User=mongoose.model("User", userschema);
    module.exports=User;