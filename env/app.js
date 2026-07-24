require("dotenv").config();

const port = process.env.PORT || 3000

const http = require("http")

const server=http.createServer((req,res)=>{
    res.end("running")
})

server.listen(port,()=>{
    console.log(`serever running on port ${port}`);
})