const express=require("express")

const app=express();

app.use((req,res,next)=>{
    console.log('Hello');
    next();
})

app.get('/',(req,res)=>{
    console.log('Hi');
    res.send("Home Page")
})


app.listen(3000,()=>{
    console.log("server running");
    
})