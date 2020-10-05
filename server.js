
const profileRoute=require('./routes/profileRoute');
const requestRoute=require('./routes/requestRoute');
const postRoute=require('./routes/postRoute');
const chatRoute=require('./routes/chatRoute');
const authRoute=require('./routes/authRoute');
const mongoose=require('mongoose');
const express=require('express');
const {MONGOURI}=require('./config/keys');
const cors=require('cors');
const io =require('socket.io');
const PORT =process.env.PORT || 8000
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false ,
    useCreateIndex:false
});
mongoose.connection.on('connected',()=>{
    console.log("Connected");
})
const app=express();
app.use(cors());
app.use(express.json());
app.use(authRoute);
app.use(profileRoute);
app.use('/request',requestRoute);
app.use('/post',postRoute);
app.use(chatRoute);
if(process.env.NODE_ENV==="production")
{
    app.use(express.static('client/build'))
    const path=require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log("Listening in port ",PORT);
});
