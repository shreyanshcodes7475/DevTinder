const express= require("express");
const app= express();


app.use("/hello",(req,res)=>{
    res.send("hello page");
});

app.use("/test",(req,res)=>{
    res.send("test page");
});

// it caches evrything
app.use("/",(req,res)=>{
    res.send("home page");
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${3000}`);
});