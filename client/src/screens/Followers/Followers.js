import Axios from 'axios';
import {Link} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import './Followers.css'; 
import { useHistory } from "react-router-dom";
import MessageIcon from '@material-ui/icons/Message';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
function Followers()
{
 const history=useHistory();   
 const [data,setData]=useState([]); 
 const [loading,setloading]=useState(false);
 const [message,setmessage]=useState(false);
 const [req,setrequest]=useState(false);
   useEffect(() => {
    setloading(true);
    Axios.get("/request/followers",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
        setloading(false);
      setData(details.data.followers)
      setmessage(details.data.followers.length)
      
     

    }).catch(error=>{
      console.log(error);
    });
  }, []);
  const followUser=(id)=>{
    setrequest(false);
    Axios.put('/request/follow_request',{
      followingId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(result=>{
      console.log(result);
      setrequest(result.data);
      
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
          (!message)
          ?
          <div className="no-request">No Followers yet</div>
          : 
      data.map(items=>{
        return(
        <div className="followers_people_card">
        <h2 className="followers_username"><img className="followers_profilePic" src={items.profile.profilePic} /><Link to={"/profile/id="+items._id }>{items.name}</Link></h2>
        <p className="followers_profile"><Link to={"/chat/id="+items._id }>< MessageIcon  /></Link></p>
        <button onClick={()=>followUser(items._id)}>follow back</button>
     
        </div>
        )
      })
    }
       {
             (req)
             ?
             <div className="request-sent">&nbsp;{req}<CloseIcon onClick={()=>setrequest("")} className="close-icon"/></div>
             
             :
             <div></div>
             }
        
</div>


  )
}
export default Followers;