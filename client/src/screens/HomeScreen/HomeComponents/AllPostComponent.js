import React,{useState,useEffect} from 'react';
import './AllPostComponent.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
function AllPost()
{
    
 const [data,setData]=useState([]); 
 const [user_id,setId]=useState("")
 const [loading,setloading]=useState(false);
 
   useEffect(() => {
     setloading(true);
    Axios.get("/post/allpost",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
      setData(details.data);
      console.log(details.data);
      let user=localStorage.getItem('user');
      user=JSON.parse(user)
      console.log(user._id);
      setId(user._id)
      setloading(false);

    }).catch(error=>{
      console.log(error);
    });
  }, [])
  const renderData=()=>{
    Axios.get("/post/allpost",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
      setData(details.data);
      console.log(details.data);
    }).catch(error=>{
      console.log(error);
    });
  }
  const likePost=(id)=>{
    Axios.put('/post/like',{
      postId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(result=>{
      console.log(result);
      renderData();
      
      
    }).catch(error=>{
      console.log(error);
    })

  }
  const unlikePost=(id)=>{
    Axios.put('/post/unlike',{
      postId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(result=>{
      console.log(result);
      renderData();
    }).catch(error=>{
      console.log(error);
    })
  }

  const comment=(text,postId)=>{
    Axios.put('/post/comment',{
      postId:postId,
      text:text
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(result=>{
      console.log(result);
      renderData();
    }).catch(error=>{
      console.log(error);
    })

  }
  
 
  return (
    (loading)?
    <CircularProgress id="spinner-center"/>
    :
    <div className="post">
    {
      data.map(items=>{
        return(
        <div className="post_card">
        <h2 className="post_username"><img className="profilePic" src={items.postedBy.profile.profilePic} /><Link to={items.postedBy._id !== user_id?"/profile/id="+items.postedBy._id :"/profile"  }>{items.name}</Link></h2>
      <div className="container">
        <img className="postImage" src={items.photo}/>
        <div className="likes">           
                      < ThumbDownAltIcon className="like_icon"  onClick={()=>{unlikePost(items._id)} } />
                      <ThumbUpAltIcon className="unlike_icon" onClick={()=>{likePost(items._id)}} />
        <h6>{items.like.length} likes</h6>
        </div>
        <div></div>
        <div className="comments">
          <p className="post_message" > <img className="post_message_pic" src={items.postedBy.profile.profilePic}/><strong>{items.name}</strong><p>&nbsp;{items.message}</p></p>
           <p className="view_comment" >All comments</p>
           <div className="allcomments">
           {
                              items.comment.map(record=>{
                                  return(
                                  <h6><span style={{fontWeight:"500"}}>{record.name}</span> {record.text}</h6>
                                  )
                              })
                          }
           </div>
        </div>
        
        <form onSubmit={(e)=>{
                              e.preventDefault()
                              comment(e.target[0].value,items._id)
                              e.target[0].value=""
                          }}>
                            <input type="text" placeholder="Comment" />  
                          </form>
          
      </div>
    </div>
        )
      })
     
    }
  
     

  </div>

)
}

export default AllPost;