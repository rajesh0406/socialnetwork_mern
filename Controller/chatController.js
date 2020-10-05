const express=require('express');
const app=express();
app.use(express.json());
var http = require("http").Server(app)
var io= require("socket.io")(http)
const mongoose=require('mongoose');
const User=require('../models/userSchema');


io.on("connection", (socket) => {
    console.log("Socket is connected...")
})
const chat_get=(req,res)=>{
    Message.find({}, (error, chats) => {
        res.send(chats)
    })
}
const chat_post=async (req,res)=>{
    try {
        var chat = new Message(req.body)
        await chat.save()
        res.sendStatus(200)
        
        io.emit("chat", req.body)
        } catch (error) {
        res.sendStatus(500)
        console.error(error)
        }
}
module.exports={
    chat_get,
    chat_post
}