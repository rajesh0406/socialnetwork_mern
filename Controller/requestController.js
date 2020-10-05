const mongoose=require('mongoose');
const User=require('../models/userSchema');
const Chatroom=require('../models/chatroom');
const people=(req,res)=>{
    User.find({"_id":{$ne:req.user._id}}).then(function(err,result){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(result);
        }
    });
}


const following=(req,res)=>{
    User.findById({_id:req.user._id},'following').populate('following').then(function(err,result){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(result);
        }
    });
}
const followers=(req,res)=>{
    User.findById({_id:req.user._id},'followers').populate('followers').then(function(err,result){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(result);
        }
    });
}

const check_existing=(req,res)=>{
    User.exists({_id:req.user._id,following:req.params.id},(err,result)=>{
        if(err)
        {
           res.send(err)
        }
        else{
                res.send(result)
        }

    });
  
}

const unfollow_user=(req,res)=>{
    User.findByIdAndUpdate({_id:req.user._id},{$pull:{following:req.body.followingId}},(err,result)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            User.findByIdAndUpdate({_id:req.body.followingId},{$pull:{followers:req.user._id}},(err,results)=>{
                if(err)
                {
                    res.send(err)
                
                }
                else
                {
                    res.send("Request updated");
                }
            })
        }
    })
   
}
const view_request=(req,res)=>{
    User.findById({_id:req.user._id},'request').populate('request').then(function(err,result){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(result);
        }
    });
}
const accept_request=(req,res)=>{
    User.findByIdAndUpdate({_id:req.user._id},{$push:{followers:req.body.followerId}},(err,result)=>{  
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log("followers list updated")
        }
    })
    User.findByIdAndUpdate({_id:req.body.followerId},{$push:{following:req.user._id}},(err,results)=>{
       if(err)
       {
           console.log(err)
       }
       else
       {
           console.log("following list updated")
       }

    })    
    User.findByIdAndUpdate({_id:req.user._id},{$pull:{request:req.body.followerId}},(errr,result)=>{
        if(errr)
        {
            res.send(errr)
        }
        else{
            res.send("Data updated");
        }
    })
 
}
const deny_request=(req,res)=>{
    User.findByIdAndUpdate({_id:req.user._id},{$pull:{request:req.body.followerId}},(err,result)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.send("Denied follow request");
        }
    })
}
const follow_request=(req,res)=>{
    User.findOne({_id:req.body.followingId},(err,result)=>{
        if(err)
        {
           console.log(err);
        }
        else{
            if(!result.request.includes(req.user._id))
            {    if(!result.followers.includes(req.user._id))
                {
                    User.findByIdAndUpdate({_id:req.body.followingId},{$push:{request:req.user._id}},(err,result)=>{
                        if(err)
                        {
                            res.send(err)
                        }
                        else
                        {
                            
                            res.send("request sent");
                        }
                    })
                }
                else
                {
                    res.send("Already following");

                }
        }
        else
        {
            res.send("Request already sent")
        }
        }

    });
   
}
module.exports={
    people,
    check_existing,
    unfollow_user,
    following,
    followers,
    follow_request,
    deny_request,
    view_request,
    accept_request 
}