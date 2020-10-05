import Axios from 'axios';
import {Link} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import './Following.css'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
function Following()
{
    const history=useHistory();
 const [data,setData]=useState([]); 
 const [loading,setloading]=useState(false);
 const [message,setmessage]=useState(false);
   useEffect(() => {
    setloading(true);
    Axios.get("/request/following",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
        setloading(false);
      setData(details.data.following)
      setmessage(details.data.following.length)
    }).catch(error=>{
      console.log(error);
    });
  }, [])
 
  const unfollowUser=(id)=>{
    Axios.put('/request/unfollow',{
      followingId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(result=>{
       history.push('/people');
      
      
    }).catch(error=>{
      console.log(error);
    })

  }
  
 
  return (
    (loading)?
    <CircularProgress id="spinner-center"/>
    :
    <div className="following">
    {
          (!message)
          ?
          <div className="no-request">No Following</div>
          :     
      data.map(items=>{
        return(
        <div className="following_people_card">
        <h2 className="following_username"><img className="following_profilePic" src={items.profile.profilePic} />{items.name}</h2>
        <p className="following_profile"><Link to={"/profile/id="+items._id }>View profile</Link></p>
        <button onClick={()=>unfollowUser(items._id)}>unfollow</button>
        </div>
        )
      })
    }
</div>
     

  

)
}

export default Following;