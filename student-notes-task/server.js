require("dotenv").config()
const express = require("express")
const fs=require("fs")
const path=require("path")
const app=express()

const PORT=process.env.PORT
const NAME=process.env.APP_NAME

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Student Notes API")
})

app.get("/about",(req,res)=>{
    res.send(`Server running on PORT ${PORT}
        Application Name: ${NAME}`)
})

app.post("/add-note",(req,res)=>{
    const data=req.body
    fs.appendFileSync(notes.txt,data)
})

app.get('/notes',(req,res)=>{
    const data=fs.readFileSync(notes.txt)
    res.send(data)
})

console.log(path.join(__dirname,"notes.txt"))

app.listen(PORT,()=>{
    console.log("Server Running...");
})
