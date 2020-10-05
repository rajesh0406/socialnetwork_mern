import Axios from 'axios';
import {Link} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import './AllPeopleScreen.css'; 
import CircularProgress from '@material-ui/core/CircularProgress';
function AllPost()
{
    
 const [data,setData]=useState([]); 
 const [loading,setloading]=useState(false);
   useEffect(() => {
     setloading(true);
    Axios.get("/request/people",{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(details=>{
      setloading(false);
      setData(details.data);
      console.log(details.data);
      
     

    }).catch(error=>{
      console.log(error);
    });
  }, [])
  
  
 
  return (
    (loading)?
    <CircularProgress id="spinner-center"/>
    :
    <div className="post">
    {
      data.map(items=>{
        return(
        <div className="all_people_card">
        <h2 className="post_username"><img className="profilePic" src={items.profile.profilePic} />{items.name}</h2>
        <p className="view_profile"><Link to={"/profile/id="+items._id }>View profile</Link></p>
        </div>
        )
      })
     
    }
  
     

  </div>

)
}

export default AllPost;