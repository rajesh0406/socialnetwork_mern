import React,{useState,useEffect} from 'react';
import './InstagramHome.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Slider from "react-slick";
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input'; 
import Stories from 'react-insta-stories';
import Modal from 'react-modal';

import {connect} from 'react-redux';
const mapStateToProps =state=>{
  return{
    user:state.user
  }
}
function InstagramHome(props) {
    const [heartState,setIcon]=useState(true);
    const [bookmarkState,setBookmark]=useState(true);
    const [data,setData]=useState([]); 
    const [user_id,setId]=useState("")
    const [loading,setloading]=useState(false);
    const [AllProfile,setAllProfile]=useState([]);
    const [stories,setStory]=useState([]);
    
      useEffect(() => {
        setloading(true);
        console.log(props.user);
       Axios.get("/post/allpost",{
         headers:{
           "Content-Type":"application/json",
           "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
       }).then(details=>{
         setData(details.data);
         console.log(details.data);
        
       
         //setId(user._id);
         setloading(false);
   
       }).catch(error=>{
         console.log(error);
       });
       Axios.get("/status",{
           headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(details=>{
           console.log(details.data);
          
           setAllProfile(details.data);
       }).catch(error=>{
           console.log(error)
       })  
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
    

    const toggleBookmark=()=>{
        setBookmark(!bookmarkState);
    }
     
    const mediaType=(post_url)=>{
      const myRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
      if(myRegex.test(post_url))
      {
        return(
          <img className="instagram-home-feed-post-image" src={post_url}/> 
        )
      }
      else
      {
        console.log("video")
        return(
          <video controls autoplay loop className="instagram-home-feed-post-image">
            <source src={post_url}> 
            </source>
          </video>
        )
      }
    } 
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
      setIsOpen(true);
    }     
    function closeModal(){
      setIsOpen(false);
    }
    const displayStatus=(story,name,pic)=>{
      var s=[]
      if(story.length===0)
      {
        story=[{url:"https://media.images.yourquote.in/post/large/0/0/1/518/4d003600.jpg",header:{heading:name,profileImage:pic}}]
        setStory(story);
        openModal();
      }
      else
      {
      for(var i in story)
      {
        console.log(i);
        s.push({url:story[i],header:{heading:name,profileImage:pic}})
      }
      setStory(s);
      openModal();
    }

    }

     
    const settings = {
        
        slidesToShow:7,
        slidesToScroll: 1,
        infinite:false,
      };
      const Multipostsettings = {
        
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:false,
        dots:true
   
      };
      
    return (
        (loading)
        ?
        <img id="spinner-center" alt="" src="https://www.citypng.com/public/uploads/preview/light-smooth-gray-instagram-logo-light-11582492474mdoolfrrva.png"/>
        :
<div className="instagram-home-page">
<Slider {...settings} className="instagram-status-carousal">
    {
        AllProfile.map(details=>{
        return(
        <div className="instagram-status-container">
        <img className="instagram-status-snap" src={details.profile.profilePic} onClick={()=>displayStatus(details.status,details.userName,details.profile.profilePic)}/>
        <p>{details.userName}</p>
        <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
        className="instagram-slider-modal"
        shouldCloseOnEsc={true}
        >
        <Stories
        stories={stories}
        
        defaultInterval={1500}
        width={432}
        height={554}
        className="instagram-story"
      
        />
        </Modal>
        </div>
      
        )
        })
    } 
</Slider>

{
   
    <div className="instagram-home-page">
       {
      data.map(items=>{
        return(
            <div className="instagram-home-feed">
            <div className="instagram-home-feed-post">
            <div className="instagram-home-feed-row-1">
            <img className="instagram-home-feed-profile" src={items.postedBy.profile.profilePic}/>
            <p className="instagram-home-feed-profile-name"><Link className="instagram-home-feed-profile-name-link" to={items.postedBy._id !== user_id?"/profile/id="+items.postedBy._id :"/profile"  }>{items.name}</Link></p>
                <MoreHorizIcon className="instagram-home-feed-row-1-options"/>
            </div>
            {
                (items.photo.length>1)?
                <Slider {...Multipostsettings} className="instagram-multipost-slider">
                    {
                    items.photo.map(pics=>{
                      return(
                        mediaType(pics)
                      )                                   
                    })
                    }
                </Slider>
                :
                mediaType(items.photo[0])
                      
            }
            <div className="instagram-home-feed-row-2" >
            {
            (!items.like.includes(user_id))
            ?<FavoriteBorderIcon  className="instagram-like" onClick={()=>{likePost(items._id);}}/>
            :<FavoriteIcon  className="instagram-unlike"onClick={()=>{unlikePost(items._id);}}/>
            }
            <img src="https://cpng.pikpng.com/pngl/s/44-445926_circular-speech-bubble-outline-comments-comment-icon-instagram.png" className="instagram-comment-icon"/>
            <img className="instagram-post-message-icon" src="https://qph.fs.quoracdn.net/main-qimg-094b6418c35690a0a9425642728f081b"/>
            {
            (bookmarkState)
            ?<BookmarkBorderOutlinedIcon className="instagram-post-bookmark-icon" onClick={toggleBookmark}/>
            :<BookmarkIcon className="instagram-post-bookmark-icon" onClick={toggleBookmark}/>
            }
            </div>
            <p className="instagram-post-like-count">{items.like.length} likes</p>
            <div className="instagram-post-message">
                <strong id="instagram-posted-by">{items.name}</strong><p className="instagram-post-my-message">{items.message}</p>
            </div>
            <div className="instagram-view-comment-button">
                <p>View all comments</p>
    
            </div>
            <div className="instagram-post-others-comment">
            {
            items.comment.slice(0).reverse().map(record=>{
            return(
                <div className="instagram-comments">
                <p> <strong id="instagram-posted-by">{record.name}</strong>{record.text}</p>
                </div>
            )
            })
            }
                
              
            </div>
            <div className="instagram-add-comment">
                <form onSubmit={(e)=>{
                e.preventDefault()
                comment(e.target[0].value,items._id)
                e.target[0].value=""
                }}>
                <input className="instagram-add-comment-debounce" placeholder="Add a comment..."/>
                <p className="instagram-add-comment-button">POST</p>
                </form>
            </div>
            </div>
            </div>
            );
            }
            )  
            }
</div>

}
<div id="instagram-new-post-button">
  <Link className="insta-newpost-link" to="/newpost"><p  className="insta-newpost-option" >New post</p></Link>
</div>
<div id="instagram-add-story-button">
  <Link className="insta-addstory-link" to="/addstory"><p  className="insta-addstory-option" >Add story</p></Link>
</div>
</div>
);
}

export default connect(mapStateToProps)(InstagramHome);
