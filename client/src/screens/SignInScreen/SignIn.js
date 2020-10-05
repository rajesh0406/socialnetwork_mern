import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input'; 
import CloseIcon from '@material-ui/icons/Close';
import {setuser} from '../../redux/action';
import {connect} from 'react-redux';
import {action} from '../../redux/action';
const mapStateToProps=state=>{
  return{
  user:state.user
  }
  }
  const mapDispatchToProps=dispatch=>{
  return{
      action:(details)=>dispatch(action(details))
  }
  };
function SignIn(props)
{
    const [success,setSuccess]=useState("");
    const [notsuccess,setError]=useState("");
    const [emailId,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const [loading,setloadicon]=useState(false);
    const history=useHistory();
    const sendData=()=>{
       if(!emailId || !password)
       {
         setError("Please enter all input fields")
         return;
         
       }
       else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailId))
       {
         setError("Invalid Mail-Id format")
         return;
       }
        setloadicon(true);
        axios.post('/login',{
            emailId:emailId,
            password:password
        },{

        }).then(function(data){
            
            if(!data.data)
            {
            setError("Your Email-Id or password was incorrect")      
            setloadicon(false);          
            }
            else
            {
              setloadicon(false);    
            localStorage.setItem('jwt',data.data.token);
            localStorage.setItem('user',JSON.stringify(data.data.user));
            var user=localStorage.getItem('user');
            user=JSON.parse(user);
            props.action(user);
            
            setSuccess("Sign-In successful");
            history.push('/home');
           
            }
        }).catch(error=>{
          setloadicon(false);    
           setError("Something went wrong.Try again");
           console.log(error);
        })

    }
    

  return (
  
    <div className="card">
      <h2 className="title">Connect</h2>
    <div className="container">
    <DebounceInput className="input" debounceTimeout={300} type="mail" placeholder="Email-Id" onChange={(e)=>setEmail(e.target.value)}/>    
    <DebounceInput className="input" debounceTimeout={300} type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
      
        <center>
          <button className="signin-button" onClick={()=>sendData()} disabled={loading}>
          {loading && <span className="loading-dots">Verifying</span>}
          {!loading && <span>Sign-In</span>}
          </button></center>
        {
        (!success)
        ?
        <div></div>
        :
        <div className="green" >{success}</div>
        } 
       {
      (!notsuccess)
      ?
      <div></div>
      :
      <div className="red">{notsuccess}
      <CloseIcon onClick={()=>setError("")} className="close-icon"/>
      </div>

      }
 
      <p className="no_account">Don't have an account ? &nbsp;<Link to="/signup">Sign-Up</Link></p>
     
      
    </div>
   
  </div>
  
  )
};
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);