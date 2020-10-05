import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import './NewPost.css';
import axios from 'axios';
import {storage} from '../../firebase/index'
import CloseIcon from '@material-ui/icons/Close';
import {DebounceInput} from 'react-debounce-input'; 
import LinearProgress from '@material-ui/core/LinearProgress';
function NewPost()
{
    const history=useHistory();
    const [title,setTitle]=useState("");
    const [message,setMessage]=useState("");
    const photos=[];
    const [success,setSuccess]=useState("");
    const [error,setError]=useState("");
    const [loading,setloadicon]=useState(false);
    const [files, setFiles] = useState([])
    const [progress,setProgress]=useState(false)
    const onFileChange = e => {
      for (let i = 0; i < e.target.files.length; i++) {
           const newFile = e.target.files[i];
           newFile["id"] = i;
           setFiles(prevState => [...prevState, newFile]);
         }
       };
       const sendData=(e)=>{
         setProgress(true);
        e.preventDefault(); 
        let count=0;
        const promises = [];
        files.forEach(file => {
         const uploadTask = 
          storage.ref(`images/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(
               'state_changed',
               (snapshot) => {
                  console.log("wait a few seconds");
                 },
                 error => console.log(error.code),
                 async () => {
                   const downloadURL = await storage.ref('images').child(file.name).getDownloadURL()
                    count+=1; 
                    console.log(`${count} `,downloadURL)
                    photos.push(downloadURL);
                    if(count===files.length)
                    {
                      display();
                    }
                   
                  }
                 );
               });
              

               
       }
  const display=()=>
  {
    console.log(photos);
    postData()
  }

    const postData=()=>{
      axios.post("/post/new",{
        title:title,
        message:message,
        photo:photos
        },
        {
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(data=>{
      setProgress(false) 
      if(data.data){ 

      history.push('/home');
    }
    }).catch(function(error){
      setProgress(false)
      setloadicon(false);
      setError("Something went wrong.Try again");
        console.log(error);
    });

    }
    return(
        <div className="new_post_card">
      <h2 className="new_post_title">New-Post</h2>
    <div className="new_post_container">
    <DebounceInput className="input" debounceTimeout={300} type="text" name="title" placeholder="Post Name" onChange={(e)=>setTitle(e.target.value)}/>     
    <DebounceInput className="input" debounceTimeout={300} type="text" name="message" placeholder="Message" onChange={(e)=>setMessage(e.target.value)}/>     
    <DebounceInput className="input" debounceTimeout={300} name="file"  type="file"  multiple onChange={onFileChange}   />     
    {
        (!success)
        ?
        <div></div>
        :
        <div className="green" >{success}</div>
        } 
       {
      (!error)
      ?
      <div></div>
      :
      <div className="red">{error}
      <CloseIcon onClick={()=>setError("")} className="close-icon"/>
      </div>
      }
        <center><button className="button" onClick={(e)=>sendData(e)} disabled={loading}>
        {loading && <span className="loading-dots">Loading</span>}
          {!loading && <span>Upload Post</span>}
        </button></center>
    </div>
    {
    (progress)?
    <LinearProgress />
    :
    <div/>
    }
  </div>

    )
};
export default NewPost;