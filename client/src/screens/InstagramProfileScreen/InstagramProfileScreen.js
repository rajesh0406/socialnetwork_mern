import FadeLoader from 'react-spinners/FadeLoader'
import React, { useState,useEffect } from 'react';
import './Instagram.css';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ModeCommentRoundedIcon from '@material-ui/icons/ModeCommentRounded';
import Axios from 'axios';
import {connect} from 'react-redux';
import {action} from '../../redux/action';
import {Link,useHistory} from 'react-router-dom';

const mapStateToProps=state=>{
  return{
  user:state.user
  }
  }
  const mapDispatchToProps=dispatch=>{
  return{
      action:(details)=>dispatch(action(details))
  }
  }
function InstagramProfileScreen(props) {
    const history=useHistory();
 
    const [post,setPost]=useState([]);

    const [date,setDate]=useState("");
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const [loading,setloading]=useState(false);
    const [imageloading,setimageloading]=useState(false);
     useEffect(() => {
      
      var user=localStorage.getItem('user');
      user=JSON.parse(user);
      props.action(user);
      console.log(user.name)
        var dob=props.user.profile.dob.split('-')
        setYear(dob[0])
        setMonth(dob[1])
        const d=dob[2][0]+dob[2][1]
        setDate(d);
         setimageloading(true);
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

    return (
(loading)?
<img id="spinner-center" alt="" src="https://www.citypng.com/public/uploads/preview/light-smooth-gray-instagram-logo-light-11582492474mdoolfrrva.png"/>
:
<div className="instagram-profile-page">
<div className="instagram-profile-contents">
<div className="instagram-profile-pic">
<Link to="/edit_profile_pic"><img className="instagram-profile-image" src={props.user.profile.profilePic ||"https://cf.shopee.co.id/file/591645859b0640881207808c54be31e9"}/></Link>
</div>
<div className="instagram-profile-details">
    <div className="instagram-profile-row-1">
    <p className="row-1-username">{props.user.userName}</p>
    <div className="edit-button">
       <Link className="edit-button-link" to="/edit-profile"> <p > Edit profile</p></Link>

    </div>
    <img className="configuration-icon" src="https://www.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_setting-512.png"/>
    </div>
    <div className="instagram-profile-row-2">
    <p className="row-2-post"><p className="instagram-count">{post.length}</p> posts</p>
    <p className="row-2-followers"><p className="instagram-count">{props.user.followers.length}</p> followers</p>
    <p className="row-2-following"><p className="instagram-count">{props.user.following.length}</p> following</p>
    </div>
    <div className="instagram-profile-row-3">
        <p className="row-3-name">{props.user.name}</p>
        <p className="row-3-description">{date}/{month}/{year}</p>
        <p className="row-3-description">{props.user.profile.location}</p>
        <p className="row-3-description">{props.user.profile.workplace}</p>
        <p className="row-3-description">{props.user.profile.school_college}</p>
    </div>
</div>

</div>
<ul className="instagram-buttons">
    <li className="my-post-button"><img src="https://www.iconfinder.com/data/icons/instagram-32/512/Grid_Layout-512.png"/>POSTS</li>
    <li className="my-post-button"><img src="https://www.iconfinder.com/data/icons/social-media-2222/64/IGTV-512.png"/>IGTV</li>
    <li className="my-post-button"><img src="https://www.iconfinder.com/data/icons/basic-user-interface-application/32/INSTAGRAM_ICON_SETS-07-512.png"/>SAVED</li>
    <li className="my-post-button"><img src="https://www.iconfinder.com/data/icons/instagram-17/32/16-tagged-512.png"/>TAGGED</li>

</ul>
<div className="instagram-my-posts">
            {
                post.map(items=>{
                    return(
                        <div className="instagram-post-container">
                        <img className="post-image" src={items.photo}/>
                        <div className="overlay"> 
                        <div className="overlay-content">
                    <p className="post-icon">{items.like.length}&nbsp;<FavoriteOutlinedIcon /></p>
                    <p className="comment-icon">{items.comment.length}&nbsp;< ModeCommentRoundedIcon /></p>
                        </div>
                         </div>
                        </div>  

                    )
                })
          
            
            }
</div>

</div>


    );
}

export default connect(mapStateToProps,mapDispatchToProps)(InstagramProfileScreen);

