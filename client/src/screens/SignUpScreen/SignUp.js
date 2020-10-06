import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';
import {DebounceInput} from 'react-debounce-input'; 
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import {signup} from '../../redux/action';
const mapStateToProps=state=>{
  return{
  user:state.user
  }
  }
  const mapDispatchToProps=dispatch=>{
  return{
      signup:(details)=>dispatch(signup(details))
  }
  };
function SignUp(props)
{
  const history=useHistory("");
  const [success,setSuccess]=useState("");
  const [notsuccess,setError]=useState("");
  const [name,setName]=useState("");
  const [emailId,setEmail]=useState("");
  const [phnNo,setNumber]=useState("");
  const [userName,setUser]=useState("");
  const [password,setpassword]=useState("");
  const [loading,setloadicon]=useState(false);
  const sendData=()=>{
    if(!name || !emailId || !phnNo || !userName || !password)
    {
      setError("Please Enter all input fields")
      return;
    }
    else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailId))
    {
      setError("Invalid Mail-Id format")
      return;
    }
    setloadicon(true);
    const details={
      name:name,
      emailId:emailId,
      phnNo:phnNo,
      userName:userName,
      password:password
      }
    const res=props.signup(details);
    setloadicon(false);
              if(!res.data)
              {
                setError("Something went wrong during sign-up");
                
              }
              else if(res.data==="exist")
              {
                setError("User-Id already exists")
              }
              else if(res.data){
              setSuccess("Sign-up successfull");
              history.push("/");
              }

  };
  return (
  
    <div className="card">
      <h2 className="title">Connect</h2>
    <div className="container">
    <DebounceInput className="input" debounceTimeout={300} type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
    <DebounceInput className="input" debounceTimeout={300} type="email" placeholder="Email-Id" onChange={(e)=>setEmail(e.target.value)}/>
    <DebounceInput className="input" debounceTimeout={300} type="number" placeholder="Phone Number" onChange={(e)=>setNumber(e.target.value)} />
    <DebounceInput className="input" debounceTimeout={300} type="text" placeholder="User Name" onChange={(e)=>setUser(e.target.value)}/>
    <DebounceInput className="input" debounceTimeout={300} type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />     
      <center><button className="button" onClick={()=>sendData()} >
        {loading && <span className="loading-dots">Loading</span>}
          {!loading && <span>Sign-Up</span>}</button>  </center>
      {
        (!success)
        ?
        <div></div>
        :
        <div className="success" >{success}</div>
      }      
      {
      (!notsuccess)
      ?
      <div></div>
      :
      <div className="error">
        {notsuccess}
      <CloseIcon onClick={()=>setError("")} className="close-icon"/>
      </div>
      } 
      <p className="account_exist">Already have an account ? &nbsp;<Link to="/">Sign-In</Link></p>
      
    </div>
  </div>
  
  )
};
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);


