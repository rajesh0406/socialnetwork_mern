import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import './OthersProfile.css';
import CakeIcon from '@material-ui/icons/Cake';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
function ProfileScreen()
{
    const [profiledata,setProfile]=useState([]); 
    const [post,setPost]=useState([]);
    const [date,setDate]=useState("");
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const [followersCount,setCount]=useState("");
    const [followingCount,setFollowing]=useState("");
    const history=useHistory();
    const [url,setURl]=useState("");
    const [loading,setloading]=useState(false);
    const [message,setMessage]=useState("")
    useEffect(() => {
      setloading(true);
        var Url=new URL(window.location.href);
        Url=Url.href;
        Url=Url.slice(Url.indexOf('=')+1)
        setURl(Url);
        Axios.get(`/profile/${Url}`,{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(details=>{
          setloading(false);
            setProfile(details.data.result.profile);
            console.log(details)
            setDate(details.data.date);
             setMonth(details.data.month);
             setYear(details.data.year);
             setCount(details.data.result.followers)
             setFollowing(details.data.result.following)

             Axios.get(`/post/mypost/${Url}`,{
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
          }).then(details=>{            
            console.log(details.data);         
            setPost(details.data)
      
          }).catch(error=>{
            console.log(error);
          })
       
          }).catch(error=>{
             console.log(error);
           });
      },
     []);
     const followRequest=()=>{
      Axios.put('/request/follow_request',{
        followingId:url
      },{
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(result=>{
        console.log(result.data); 
        setMessage(result.data)
      }).catch(error=>{
        console.log(error);
      })
  
    }

    return(
      (loading)?
      <CircularProgress id="spinner-center"/>
      :
        <div className="others_profile_component">
            <div className="others_profile_card">
           
                <img src={profiledata.profilePic} className="others_profile_pic"/>
                <div className="friends_count">  
                <div className="followers_count">
                <h6 >&nbsp;&nbsp;&nbsp;{followersCount.length}</h6>
                <p>&nbsp;&nbsp;Followers</p>
                </div>
                <div  className="following_count">
                <h6>&nbsp;&nbsp;&nbsp;{followingCount.length}</h6>
                <p>&nbsp;&nbsp;Following</p>

                </div>
                <div>
                <button onClick={()=>followRequest()}>follow request</button>
                {
                (message)
                ?
                <div className="request-already-exist">&nbsp;{message}<CloseIcon onClick={()=>setMessage("")} className="close-icon"/></div>
                
                :
                <div></div>
                }
                </div>
                </div>

                
                <div className="others_profile_details">
                <p><CakeIcon className="others_profile_icons"/>&nbsp;{date}/{month}/{year}</p>
                <p><LocationOnIcon className="others_profile_icons"/>&nbsp;{profiledata.location}</p>
                <p><WorkIcon className="others_profile_icons"/>&nbsp;{profiledata.workplace}</p>
                <p><SchoolIcon className="others_profile_icons"/>&nbsp;{profiledata.school_college}</p>          
                </div>    
                </div>
            <div className="profile_card">
            {
                    post.map(items=>{
                        return (
                           
                               
                               <div className="others_post_container">
                               <img className="others_post_image" src={items.photo}/>
                               
                             </div>
                            
                    )
                    
                })
            }

            </div>
        </div>
        
    )
}
export default ProfileScreen;