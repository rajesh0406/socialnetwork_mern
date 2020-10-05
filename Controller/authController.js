const mongoose=require('mongoose');
const Bcrypt=require('../services/bcrypt');
const User=require('../models/userSchema');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/keys');

const signup=(req,res)=>{
   
    User.findOne({ "emailId": req.body.emailId },function(error,existing_user){
        if(existing_user)
        {
            res.send("exist");
        }
        else{
            
            
            const hashpassword= Bcrypt.generateHash(req.body.password);
            var newUser=new User({name:req.body.name,emailId:req.body.emailId,phnNo:req.body.phnNo,password:hashpassword,userName:req.body.userName});
            
            newUser.save(function(err,result){
                if(err)
                {
                    res.send(false);
                }
                else{
                    res.send(true);
                }
                res.end();
            });
            
           

        }

    });
}
const login=(req,res)=>{
    User.findOne({"emailId":req.body.emailId}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
            if(!result) {
                const error="The Email-id does not exist.Please sign-up before you login "
                return res.send(false);
            }
            else if(!Bcrypt.comparePassword(req.body.password,result.password)) {
                const error="The password is invalid"
                return res.send(false);
            }
            else
            {
            
            const token=jwt.sign({_id:result._id},JWT_SECRET);
            return res.send({token:token,user:result});
            }
        }
 });    
}

module.exports={
    signup,
    login,
    
}