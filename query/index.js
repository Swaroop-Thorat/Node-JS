const express=require("express")

const app=express()

app.get('/',(req,res)=>{
    setTimeout(()=>{
        res.redirect('/search?keyword=Swaroop')
    },5000)
})

app.get('/search',(req,res)=>{
    const keyword=req.query.keyword || "nothing"
    res.send(`searching for ${keyword}`)
})

app.listen(3000)