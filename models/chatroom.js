const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const chatroomSchema=mongoose.Schema({
    user1:{
        type:ObjectId,
        ref:"user"
    },
    user2:{
        type:ObjectId,
        ref:"user"
    },
    chat:[{
        user_id:{
            type:String,
            
        },
        message:{
            type:String,
            
        }
    }]
}
);
var chatRoom=mongoose.model("chatroom",chatroomSchema);
module.exports=chatRoom;