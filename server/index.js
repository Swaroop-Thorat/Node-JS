const http=require("http")

const server=http.createServer((req,res)=>{
    console.log("running")
    res.end("running server")
})

server.listen("3000")