import Axios from 'axios';
import {Link} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import './FollowRequest.css'; 
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
function Following()
{
    
 const [data,setData]=useState([]); 
 const [loading,setloading]=useState(false);
 const [message,setmessage]=useState(false);
 const history=useHistory();
 useEffect(() => {
    setloading(true);
    Axios.get("/request/view_request",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
        setloading(false);
      setData(details.data.request)
          setmessage(details.data.request.length)
    }).catch(error=>{
      console.log(error);
    });
  }, [])
  
const render=()=>{
    setloading(true);
    Axios.get("/request/view_request",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
        setloading(false);
      setData(details.data.request)
          setmessage(details.data.request.length)
    }).catch(error=>{
      console.log(error);
    });
}
 const denyRequest=(id)=>{
    Axios.put('/request/deny',{
        followerId:id
      },{
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(result=>{
        console.log(result);
        render();
      }).catch(error=>{
        console.log(error);
      })
 }
 const acceptRequest=(id)=>{
    Axios.put('/request/accept_request',{
      followerId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(result=>{
      console.log(result);
      render();

    }).catch(error=>{
      console.log(error);
    })

  }
  
  

  return (
    (loading)?
    <CircularProgress id="spinner-center"/>
    :
    <div className="request">
    {
         (!message)
         ?
         
         <div className="no-request">No Follow Request yet</div>
         :   
        data.map(items=>{
        return(
        <div className="request_people_card">
        <h2 className="request_username"><img className="request_profilePic" src={items.profile.profilePic} />{items.name}</h2>
        <p className="request_profile"><Link to={"/profile/id="+items._id }>View profile</Link></p>
        <button onClick={()=>denyRequest(items._id)}>Deny</button>&nbsp;
        <button onClick={()=>acceptRequest(items._id)}>Accept</button>
        </div>
        )
      })
    }
 
</div>
 


  

)
}

export default Following;