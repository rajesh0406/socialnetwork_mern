import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import './ProfileScreen.css';
import {Link} from 'react-router-dom';
import CakeIcon from '@material-ui/icons/Cake';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
function ProfileScreen()
{
    const history=useHistory();
    const [profiledata,setProfile]=useState([]); 
    const [post,setPost]=useState([]);
    const [date,setDate]=useState("");
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const [followersCount,setCount]=useState("");
    const [followingCount,setFollowing]=useState("");
    const [photo,setPhoto]=useState("");
    const [loading,setloading]=useState(false);
    const [error,setError]=useState("");
    const [Url,setUrl]=useState("");
  
    useEffect(() => {
        setloading(true);
        Axios.get("/profile",{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(details=>{
            setloading(false);
            setProfile(details.data.result.profile);
            console.log(details.data)
             setDate(details.data.date);
             setMonth(details.data.month);
             setYear(details.data.year);
             setCount(details.data.result.followers)
             setFollowing(details.data.result.following)
           }).catch(error=>{
             console.log(error);
           });
      },
     []);
    useEffect(() => {
        Axios.get("/post/mypost",{
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
        },
     []);
    const deletePost=(Id)=>{
        Axios.put("/post/delete",{
            postId:Id
        },{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
              }
        }).then(details=>{
            console.log(details)
            
            history.push('/home');
        }).catch(err=>{
            console.log(err);
        })

    }
  
    return(
       
           (loading)?
           <CircularProgress id="spinner-center"/>
           :
           <div className="profile_component">

            <div className="profile_card">
                <Link to="edit_profile_pic"><img src={profiledata.profilePic} className="profile_pic"/></Link>           

  
                <div className="friends_count">
                <div className="followers_count">
                <h6 >&nbsp;&nbsp;&nbsp;{followersCount.length}</h6>
                <p>&nbsp;&nbsp;<Link to="/followers">Followers</Link></p>
                </div>
                <div  className="following_count">
                <h6>&nbsp;&nbsp;&nbsp;{followingCount.length}</h6>
                <p>&nbsp;&nbsp;<Link to="/following">Following</Link></p>

                </div>
             
                <button className="edit_button" ><Link to="/edit-profile">Edit-profile</Link></button> 

                </div>
                {
                (loading)
                ?
                <CircularProgress/>
                :
                <div></div>
                }
                 {
      (!error)
      ?
      <div></div>
      :
      <div className="error">
        {error}
      <CloseIcon onClick={()=>setError("")} className="close-icon"/>
      </div>
      } 

                <hr/>
                <div className="profile_details">
                <p><CakeIcon className="profile_icons"/>&nbsp;{date}/{month}/{year}</p>
                <p><LocationOnIcon className="profile_icons"/>&nbsp;{profiledata.location}</p>
                <p><WorkIcon className="profile_icons"/>&nbsp;{profiledata.workplace}</p>
                <p><SchoolIcon className="profile_icons"/>&nbsp;{profiledata.school_college}</p>          
                </div>    
            </div>
            <div className="profile_card">
             
                {
                    post.map(items=>{
                        return (
                           
                               
                               <div className="post_container">
                               <img className="post_image" src={items.photo}/>
                               <div className="overlay"> 
                                <DeleteIcon className="post_icon" onClick={()=>deletePost(items._id)}/>
                               </div>
                             </div>
                            
                    )
                    
                })
            }

           
            </div>

        </div>
        
    )
}
export default ProfileScreen;