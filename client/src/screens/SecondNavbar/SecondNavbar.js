import React from 'react';
import './SecondNavbar.css';
import {Link} from 'react-router-dom';

function Navbar()
{
  
 
    return(
<div className="SecondNavbar">

<ul> 

 
  <li><Link to="/people">All</Link></li>
  <li><Link to="/followers">Followers</Link></li>
  <li><Link to="/following">Following</Link></li>
  <li><Link to="/follow_request">Follow Request</Link></li>
</ul>
</div>

    )
};
export default Navbar;