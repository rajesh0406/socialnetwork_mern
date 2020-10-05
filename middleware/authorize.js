const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys');
const mongoose=require('mongoose');
const User=require('../models/userSchema');
module.exports=(req,res,next)=>
{
    const {authorization}=req.headers
    if(!authorization)
    {
        res.send(401).json({error:"You must be logged in"});
    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,result)=>{
        if(err)
        {
            res.send(401).json({error:"You must be logged in"});
        }
        const {_id}=result;
        User.findById({_id},(err,results)=>{
            if(err)
            {
                res.send("Something went wrong");
            }
            else{
                req.user=results;
                
            }
            next();
        });
       
    });
}