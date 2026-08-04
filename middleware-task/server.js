const express=require("express")
const app=express();

app.use(express.json())

app.use((req,res,next)=>{
    console.log("Request Recieved");
    next()
})

app.use((req,res,next)=>{
    const Method=req.method
    const URL=req.url
    console.log(`
        Method:${Method},
        URL:${URL}
        `);
    next()
})

app.get('/',(req,res)=>{
    res.send("Welcome to Home Page")
})
app.get('/about',(req,res)=>{
    res.send("Welcome to About Page")
})
app.get('/contact',(req,res)=>{
    res.send("Welcome to Contact Page")
})
app.post('/student',(req,res)=>{
    const body=req.body
    console.log(body);
    
    res.send("Welcome to Student Page")
})

const ad=(req,res,next)=>{
    console.log("Admmin Middleware Running..");
    next()
}

app.get('/admin',ad,(req,res)=>{
    res.send("Welcome to Admin Page")
})

app.listen(3000,()=>{
    console.log("Server Running.....");
    
})