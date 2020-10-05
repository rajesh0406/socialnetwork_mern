const mongoose=require('mongoose');
const User=require('../models/userSchema');
const Post=require('../models/postSchema');

const profile=(req,res)=>{
    User.findOne({"_id":req.user._id},function(err,result)
    {
        if(err)
        {
            res.send("Something went wrong");
        }
        const year=result.profile.dob.getYear()+1900
        const date=result.profile.dob.getDate();
        const month=result.profile.dob.getMonth()+1;      
       
     res.send({result,date,month,year});
 
    }); 
}
const others_profile=(req,res)=>{
    User.findOne({"_id":req.params.id},function(err,result)
    {
        if(err)
        {
            res.send("Something went wrong");
        }
        const year=result.profile.dob.getYear()+1900
        const date=result.profile.dob.getDate();
        const month=result.profile.dob.getMonth()+1;
       
       
       
     res.send({result,date,month,year});
 
    }); 
}
const profile_edit=(req,res)=>{
    User.findOne({"_id":req.user._id},function(err,result){
        if(err)
        {
            res.send(err);
        }
        const d=new Date();
        result.name=req.body.name;
        result.profile.dob=d.setDate(req.body.date);
        result.profile.dob=d.setMonth(req.body.month-1);
        result.profile.dob=d.setYear(req.body.year);
        result.profile.relationship_status=req.body.status,
        result.profile.workplace=req.body.workplace,
        result.profile.school_college=req.body.school,
        result.profile.location=req.body.location
        result.save(function(err,result){});
        res.send("Details saved");
    });
}
const edit_profile_pic=(req,res)=>{
   
    User.findOne({"_id":req.user._id},(err,result)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            result.profile.profilePic=req.body.photo;
            result.save(function(error,results){
                if(error)
                {
                    res.send(error);
                }
                res.send(results)
            });

            
        }
       
    });
}
const status=(req,res)=>{
    User.find({},'profile userName status',(err,result)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.send(result);
        }
    })
}
const update_story=(req,res)=>{
      User.findOne({_id:req.user._id},(err,result)=>{
          if(err)
          {
              res.send(err)
          }
          else
          {
              result.status=[];
              result.status=req.body.photo;
              result.save(function(error,res){
               
              });
              res.send(true);
              
          }
      })
}
module.exports={
    profile,
    profile_edit,
    edit_profile_pic,
    others_profile,
    status,
    update_story
  
}