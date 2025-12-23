    const mongoose=require('mongoose');
    const validator=require("validator");
    const jwt =require("jsonwebtoken");
    const bcrypt= require("bcrypt");


    // to make searches efficient , you should add indexes in your db
    // unique: true (these are the unnique indexes and tht are much faster)(unique: make the field as a indexes)
    // index: true (these are the normal index)
    // sparse: true( used to define sparse index )
    
    const userschema=mongoose.Schema({
        firstName:{
            type:String,
            required: true,

        },

        lastName:{
            type:String,
            required: true,
        },

        password:{
            type: String,
            required: true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("please enter a strong  password");
                }
            }

        },

        emailId:{
            type:String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            validate(value){
            if(!validator.isEmail(value)) throw new Error("your email is not corrrect: " + value);

            }
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

        about:{
            type: String,
            default: "This is the default about given by Devtinder"
        }
    },
        {
            timestamps: true,
        }
    )

    // token creation method (don't use arrow function here as internal implementation of this is diffrent it will not work for arrow function)
    userschema.methods.getJWT =async function(){
        const user= this;
        const token=await jwt.sign({_id: user._id}, "DEV@Tinder$790",{
            expiresIn: "7d",
        });

        return token;
    }

    // password validation at schema level
    userschema.methods.validatePassword = async function(passwordInputByUser){
        const user=this;
        const passwordHash= user.password;

        const isPasswordValid= await bcrypt.compare(
            passwordInputByUser,
            passwordHash
        )

        return isPasswordValid;
    }

    const User=mongoose.model("User", userschema);
    module.exports=User;