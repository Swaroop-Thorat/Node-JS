const express = require('express');
const cors = require('cors');

const app=express()

app.use(cors({
  origin: 'http://localhost:5500'
}));

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    `New Request
     Method: ${req.method},
     URL: ${req.url}`
     next();
})

app.get('/',(req,res)=>{
    res.redirect('/order')
})

app.get('/order',(req,res)=>{
    res.send("Welcome to the Food Ordering Page");
})

app.post('/order',(req,res)=>{
    
    const username=req.body.username
    const food=req.body.food
    const quantity=req.body.quantity
    const address=req.body.address
    const resp=`Order Placed Successfully!

      Customer: ${username},
      Food: ${food};
      Quantity: ${quantity},    
      Address: ${address}`
    res.send(resp);
})

app.listen(5000,()=>{
    console.log("server running...");
    
})