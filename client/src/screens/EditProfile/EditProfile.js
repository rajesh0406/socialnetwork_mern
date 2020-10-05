import React,{useState,useEffect} from 'react';
import './EditProfile.css';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
function EditProfile()
{
    const history=useHistory();
    const [date,setDate]=useState("");
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const [location,setLocation]=useState("");
    const [workplace,setWork]=useState("");
    const [School,setSchool]=useState("");
    const [status,setStatus]=useState("");
    const [username,setName]=useState("");
    const [loading,setloading]=useState(false);
    useEffect(() => {
        Axios.get("/profile",{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(details=>{
            
            console.log(details.data)
             setDate(details.data.date);
             setMonth(details.data.month);
             setYear(details.data.year);
             setName(details.data.result.name);
             setLocation(details.data.result.profile.location)
             setSchool(details.data.result.profile.school_college)
             setWork(details.data.result.profile.workplace)
             setStatus(details.data.result.profile.relationship_status);
       
           }).catch(error=>{
             console.log(error);
           });
    }, [])
    const updateData=()=>{
    setloading(true);
    Axios.post("/profile/edit",{
        workplace:workplace,
        location:location,
        school:School,
        status:status,
        date:date,
        month:month,
        year:year,
        name:username

    },{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
    }).then(result=>{
        setloading(false);
        console.log(result);
        history.push('/home');
    }).catch(error=>{
        console.log(error);
    })
}
    return(
        <div className="edit_card">
        <h2 className="edit_title">Edit Profile</h2>
      <div className="edit_container">
      <input type="text" placeholder="Username" value={username} onChange={(e)=>setName(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} />
        <input type="text" placeholder="Workplace" value={workplace} onChange={(e)=>setWork(e.target.value)}/>
        <input type="text" placeholder="School/College" value={School} onChange={(e)=>setSchool(e.target.value)}/>
        <input type="text" placeholder="Relationship Status" value={status} onChange={(e)=>setStatus(e.target.value)}/>
        <label>D.O.B&nbsp;</label>
        <input className="dob" type="number"  placeholder="Day" value={date} onChange={(e)=>setDate(e.target.value)} />     
        <input className="dob" type="number"  placeholder="Month" value={month} onChange={(e)=>setMonth(e.target.value)} />     
        <input className="dob" type="number"  placeholder="Year" value={year} onChange={(e)=>setYear(e.target.value)} />     
        <center><button className="update_button" onClick={()=>updateData()}  >
        {loading && <span className="loading-dots">Updating</span>}
        {!loading && <span>Update</span>}
        </button>  </center>  

      </div>
    </div>
    );
}
export default EditProfile;
