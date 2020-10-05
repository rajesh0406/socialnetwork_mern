import React,{useState} from 'react'
import './EditProfilePic.css';
import {DebounceInput} from 'react-debounce-input';
import CircularProgress from '@material-ui/core/CircularProgress';
import {storage} from '../../firebase/index';
import Axios from 'axios';
import { useHistory } from "react-router-dom"; 
import LinearProgress from '@material-ui/core/LinearProgress';
function EditProfilePic() {
    const [loading,setloading]=useState(false);
    const [photo,setPhoto]=useState("");
    const [Url,setUrl]=useState("");
    const history=useHistory("");
    const [spinner,setSpinner]=useState(false);
    const sendData=()=>{
        setloading(true);
        setSpinner(true);
        const uploadTask=storage.ref(`images/${photo.name}`).put(photo);
        uploadTask.on('state_changed',(message)=>{},(error)=>{},()=>{
        storage.ref('images').child(photo.name).getDownloadURL().then((ImageUrl)=>{
            setUrl(ImageUrl)
            Axios.put("/profile/edit/pic",{
                photo:ImageUrl
            },{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(result=>{
                setloading(false);
                setSpinner(false)
                history.push('/profile');
            
            }).catch(function(error){
                setloading(false);
                setSpinner(false);
            });
          
         })
       })
    }
    return (
        <div className="card">
            <div className="container">
            <DebounceInput className="input" debounceTimeout={300}  type="file"  name="photo" onChange={(e)=>setPhoto(e.target.files[0])}/>


            </div>
            <img className="edit-profile-pic" src={Url || "https://via.placeholder.com/300/09f.png/fff%20C/O%20https://placeholder.com/"} alt="image"/>
            <center>
          <button className="signin-button" onClick={()=>sendData()}  disabled={loading}>
          {loading && <span className="loading-dots">Uploading</span>}
          {!loading && <span>Upload</span>}
          </button></center>
          {
          (spinner)?
          <LinearProgress />
          :
          <div></div>
          }
        </div>
    )
}

export default EditProfilePic;
