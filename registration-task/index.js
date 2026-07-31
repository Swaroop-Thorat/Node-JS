const express=require("express")

const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.redirect(302,'/courses?category=Web Development&level=Beginner&duration=3 Months')
})
app.post('/register',(req,res)=>{
    const data=req.body
    res.send(`
        Course Registration Successful
        Name:${data.name},
        Email:${data.email}
        Course:${data.course}
        Batch:${data.batch}`)
})

app.get('/registrations',(req,res)=>{
    const {name,course,batch}=req.query

    res.send(`
        Searching Registration...
        
        Name:${name || 'Not Provided'},
        Course:${course || 'Not Provided'},
        Batch:${batch || 'Not Provided'} `)
})

app.get('/courses',(req,res)=>{
    const {category,level,duration}=req.query

    res.send(`
        Available Courses...
        
        Catagory:${category || 'Not Provided'},
        Level:${level || 'Not Provided'},
        Duration:${duration || 'Not Provided'}`)
})

app.listen(3000,()=>{
    console.log("server running..");
    
})
