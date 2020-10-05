const mongoose=require('mongoose');
const { json } = require('body-parser');
const {ObjectId}=mongoose.Schema.Types
const PostSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        default:""
    },
    photo:[{
        type:String,
        required:true
    }],
    postedBy:{
        type:ObjectId,
        ref:"user"
    },
    name:{
        type:String,
     
    },
    profilePic:{
        type:String,
        default:"https://www.w3schools.com/howto/img_avatar.png"
        
    },
    like:[{
        type:ObjectId,
        ref:"user"
    }],
    comment:[{
        text:{type:String,
            required:true,
        },
        commentBy:{
            type:ObjectId,
            ref:"user"

        },
        name:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            required:true
        }

    }]

   

});
const post=mongoose.model('post',PostSchema);
module.exports=post;