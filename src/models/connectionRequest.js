const mongoose= require("mongoose");


// here we will have query which includes both fromUserId and toUserId
const connectionRequestSchema=mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    status:{
        type: String,
        // enum is a type of custom validation method
        enum:{
            values:["Accepted", "Rejected", "Interested", "Ignored"],
            message: `{VALUE} is incorrect status type` 
            // message: `${values}, is incorrect status type`

        }
    }
},{ timestamps:true,});


// its just schema level validation(it is a kind of middleware which will be called after everytime when data is saved on db)
connectionRequestSchema.pre("save", function (next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("sender userid and reciver id can't be the same");
    }
    next();
})


// in order to optimize the search we need to add indexes in our schema(its called compound indexes) where query involve more than 1 parameters 
connectionRequestSchema.index({fromUserId: 1, toUserId:1});

const ConnectionRequestModel= mongoose.model("ConnectionRequestModel", connectionRequestSchema);
module.exports= ConnectionRequestModel;