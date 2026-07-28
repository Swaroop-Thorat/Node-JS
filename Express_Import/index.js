const express=require("express")
const http=require("http")

const app=express();

const server=http.createServer((req,res)=>{
      res.end("Request Fullfilled")
})

app.use(express.json())

app.get("/", (req, res)=>{
    res.send("kuchbhi")
})

app.post("/user", (req, res)=>{
    console.log(req.body);

    res.send("data milchuka hai")
})

app.listen(3001, () => {
    console.log("Server Running...");
});
