import React from 'react'
import {Link} from 'react-router-dom';
function InstagramNavbar() {
    return (
        <div className="instagram-header">
        <Link to="/home"><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram-navbar-icon"/></Link>
        
        <div className="instagram-search-bar">
        <p><img className="instagram-search-icon" src="https://www.clipartsfree.net/vector/large/51717-search-icon-light-grey-clipart.png"/>Search</p>
        </div>
        <div className="instagram-header-icons">    
        <Link to="/home"><img className="instagram-home-icon" src="https://www.iconfinder.com/data/icons/instagram-feature-outline/32/icon_instagram-21-512.png"/></Link>
        <img className="instagram-message-icon" src="https://qph.fs.quoracdn.net/main-qimg-094b6418c35690a0a9425642728f081b"/>
        <Link to="/newpost"><img className="instagram-compass-icon" src="https://getdrawings.com/img/silhouette-compass-4.png"/></Link>
        <Link to="/people"><img className="instagram-heart-icon" src="https://icons-for-free.com/iconfiles/png/512/heart-131965017458786724.png"/></Link>
        <Link to="/profile"><img className="instagram-profile-icon" src="https://instagram.fixc4-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fixc4-1.fna.fbcdn.net&_nc_ohc=RLYRR3IenIMAX9USM6t&oh=9c9b090a18ea1d6bd5669347f694942e&oe=5F96310F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"/></Link>
        </div>
        </div>
    )
}

export default InstagramNavbar
