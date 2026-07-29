const http=require("http")

const server=http.createServer((req,res)=>{
    console.log(req.url)
    res.setHeader('Content-Type','text/plain')
    res.write("Hello")
    res.end()

})

server.listen(5000,()=>{
    console.log("Server Running...");
    
})