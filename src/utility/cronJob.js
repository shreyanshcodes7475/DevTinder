const cron=require("node-cron");
const{subDays, startOfDay, endOfDay}=require("date-fns");
const {sendEmail}=require("./sendEmail")
const ConnectionRequestModel = require("../models/connectionRequest");




cron.schedule("0 8 * * *",async()=>{
    // send emails to all the people who got request the previous day
    try{
        const yesterday=subDays(new Date(),1);
        const yesterdayStart=startOfDay(yesterday);
        const yesterdayEnd=endOfDay(yesterday)

        const pendingRequest=await ConnectionRequestModel.find({
            status:"Interested",
            createdAt:{
                $gte:yesterdayStart,
                $lt:yesterdayEnd
            }
        }).populate("fromUserId toUserId");

        const listOfEmails=[...new set(pendingRequest.map((req)=>req.toUserId.emailId))]

        for(const email of listOfEmails){
            // send emails
            const res=await sendEmail.run("New friend request pending for "+ email, "There are so many request pending , please login to devtinder")
        }
    }
    catch(err){
        console.error(err);

    }
})


