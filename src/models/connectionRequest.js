const mongoose= require("mongoose");
const User = require("./user");


// here we will have query which includes both fromUserId and toUserId
const connectionRequestSchema=mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
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


connectionRequestSchema.pre("save", async function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("sender userid and receiver id can't be the same");
  }
});


// in order to optimize the search we need to add indexes in our schema(its called compound indexes) where query involve more than 1 parameters 
connectionRequestSchema.index({fromUserId: 1, toUserId:1});

const ConnectionRequestModel= mongoose.model("ConnectionRequestModel", connectionRequestSchema);
module.exports= ConnectionRequestModel;