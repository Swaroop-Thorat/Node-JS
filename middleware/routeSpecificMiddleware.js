const express=require("express")

const app=express();

const authCheck=(req,res,next)=>{
    console.log("Checking Credentials....");
    next();
}

app.get('/',(req,res)=>{
    res.send("This is home page")
})

app.get('/dashboard',authCheck,(req,res)=>{
    res.send("This is Dashboard")
})

app.get('/profile',authCheck,(req,res)=>{
    res.send("This is profile")
})

app.listen(5000,()=>{
    console.log("Server Running on Port 5000...");    
})