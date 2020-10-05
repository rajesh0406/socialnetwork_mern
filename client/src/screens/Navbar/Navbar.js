import React from 'react';
import './Navbar.css';
import {Link,useHistory} from 'react-router-dom';

function Navbar()
{
  const history=useHistory();
  const signOut=()=>{
    localStorage.clear();
   
    history.push('/');
    window.location.reload(false);


  }
    return(
<div className="Navbar">

<ul> 
<Link to="/home"><p className="logo">Connect</p> </Link>
<li onClick={()=>signOut()}><Link>Sign-out</Link></li>  
<li><Link to="/profile">Profile</Link></li> 
  <li><Link to="/newpost">New-post</Link></li>
  <li><Link to="/people">People</Link></li>
  <li><Link to="/home">Home</Link></li>
</ul>
</div>

    )
};
export default Navbar;