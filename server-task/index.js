const http=require("http")
require("dotenv").config()
const port=process.env.PORT || 5001
const name=process.env.APP_NAME || "Name"
const owner=process.env.OWNER || "Owner"
const server=http.createServer((req,res)=>{
    res.end(`
        Welcome to ${name}
        Owner : ${owner}
        Server Running
        `)
})

server.listen(port,()=>{
    console.log(`
        Server Started Successfully

        Application :
        ${name}
        
        Owner :
        ${owner}
        
        Running On Port :
        ${port}
        `);
    
});
