const express = require('express') 
const mongoose = require('mongoose');
const app=express();
const URL = require('./models/url')
const PORT = 8080;
const uri = 'mongodb+srv://bhavya:bhavya@cluster0.kin5ecd.mongodb.net/short_url?retryWrites=true&w=majority'
const urlroute = require('./routes/url') 
app.use(express.json())  
app.use(express.urlencoded())
app.use('/api',urlroute)  
app.get('/:shortId',async (req,res)=>{
 const shortId = req.params.shortId; 
 console.log(shortId)
 const entry =await URL.findOneAndUpdate({
  shortId
 },{$push:{
    visitHistory:{
        timestamp:Date.now(),
    },
 }})  
 console.log(entry) 
 res.redirect(entry.redirectURL)
})

app.listen(PORT,async()=>{ 
await mongoose.connect(uri)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.error('Database connection error:', err));
    console.log(`server run @ ${PORT}`) 
})
