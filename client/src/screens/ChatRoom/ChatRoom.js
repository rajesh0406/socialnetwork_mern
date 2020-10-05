import Axios from 'axios';
import {Link} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import './ChatRoom.css'; 
import { useHistory } from "react-router-dom";
import MessageIcon from '@material-ui/icons/Message';
function Followers()
{
   
 const [data,setData]=useState([]); 
 const history=useHistory();
   useEffect(() => {
    Axios.get("/request/followers",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
       
      setData(details.data.followers)
      console.log(details.data.followers);
      
     

    }).catch(error=>{
      console.log(error);
    });
  }, [])
  const followUser=(id)=>{
    Axios.put('/request/follow_request',{
      followingId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(result=>{
      console.log(result);

      history.push('/home');
      
    }).catch(error=>{
      console.log(error);
    })

  }

 
  return (
   
    <div className="post">
    {
      (data!==null)?
      data.map(items=>{
        return(
        <div className="followers_people_card">
        <h2 className="followers_username"><img className="followers_profilePic" src={items.profile.profilePic} /><Link to={"/profile/id="+items._id }>{items.name}</Link></h2>
        <p className="followers_profile"><Link to={"/chat/id="+items._id }></Link>< MessageIcon  /></p>
        <button onClick={()=>followUser(items._id)}>follow back</button>
        </div>
        )
      })
     :
     <h1>No followers yet</h1>

    }
</div>


  )
}
export default Followers;