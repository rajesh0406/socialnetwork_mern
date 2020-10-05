const User=require('../models/userSchema');
const Post=require('../models/postSchema');

const my_post=(req,res)=>{
    Post.find({"postedBy":req.user._id},(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(result);
            res.end();
        }});
}

const all_post=(req,res)=>{
    Post.find({}).populate('postedBy').exec((err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(result);
        }
    });

}
const others_post=(req,res)=>{
    Post.find({"postedBy":req.params.id},(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(result);
            res.end();
        }
    });
}
const post_new=(req,res)=>{
    User.findById({_id:req.user._id},(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            const post=new Post({
                title:req.body.title,
                message:req.body.message,
                photo:req.body.photo,
                postedBy:req.user._id,
                name:req.user.name,
                profilePic:result.profile.profilePic
            }
            );
            post.save(()=>{
                res.send(true);
            })
            console.log(req.body.photo);
        }
    })
   
       
}

const post_comment_put=(req,res)=>{
    const comment = {
        text:req.body.text,
        commentBy:req.user._id,
        name:req.user.name,
        profilePic:req.user.profile.profilePic

    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comment:comment}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(result);
            res.json(result);
        }
    })
}
const like=(req,res)=>{
    Post.exists({_id:req.body.postId,like:req.user._id},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            if(result)
            {
                res.json("Already liked");
            }
            else{
                Post.findByIdAndUpdate(req.body.postId,{
                    $push:{like:req.user._id}
                },{
                    new:true
                }).exec((err,result)=>{
                    if(err)
                    {
                        return res.status(422).json({error:err})
                    }
                    else{
                     const id= req.user._id
                     const len=result.like.length;
            
                        res.json({result,id,len});
                    }
                })
            }
        }
    })
}
const unlike=(req,res)=>{
  
    Post.findOneAndUpdate({_id:req.body.postId},{
        $pull:{like:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
           const id= req.user._id
           const len=result.like.length;
            res.json({result,id,len});
        }
    })
}
const deletePost=(req,res)=>{
    Post.deleteOne({_id:req.body.postId}).exec((err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result);
        }
    })

}
module.exports={
    all_post,
    others_post,
    my_post,
    post_new,
    post_comment_put,
    like,
    unlike,
    deletePost

}