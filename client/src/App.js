import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from './screens/SignUpScreen/SignUp';
import SignIn from './screens/SignInScreen/SignIn';
import Home from './screens/HomeScreen/HomeScreen';
import OthersProfile from './screens/OthersProfile/OthersProfile';
import Profile from './screens/ProfileScreen/ProfileScreen';
import EditProfile from './screens/EditProfile/EditProfile';
import NewPost from './screens/NewPost/NewPost';
import AllPeople from './screens/AllPeople/AllPeopleScreen'
import Navbar from './screens/Navbar/Navbar';
import Followers from './screens/Followers/Followers';
import SecondNavbar from './screens/SecondNavbar/SecondNavbar';
import Following from './screens/Following/Following';
import FollowRequest from './screens/FollowRequest/FollowRequest';
import ChatRoom from './screens/ChatRoom/ChatRoom';
import EditProfilePic from './screens/EditProfilePic/EditProfilePic';
import InstagramProfileScreen from './screens/InstagramProfileScreen/InstagramProfileScreen'
import InstagramHome from './screens/InstagramHome/InstagramHome';
import InstagramNavbar from './screens/InstagramNavbar/InstagramNavbar';
import Addstory from './screens/Addstory/Addstory';
import './App.css';

function App() {
 
 
  return (
    <div className="app" >
      
      <Router>
      
     <Switch>
       <Route path="/signup">
         <SignUp/>
       </Route>
       <Route exact path="/">
         <SignIn/>
       </Route>
       <Route path="/home">
         <InstagramNavbar/>
       <InstagramHome/>
       </Route>
       <Route exact path="/profile">
         <InstagramNavbar/>
         <InstagramProfileScreen/>
       </Route>
       <Route exact path="/profile/:id">
       <Navbar/>
         <OthersProfile/>
       </Route>
       <Route path="/edit-profile">
       <Navbar/>
        <EditProfile/>
       </Route>
       <Route path="/newpost">
       <Navbar/>
         <NewPost/>
       </Route>
       <Route path="/people">
              <SecondNavbar/>
              <AllPeople/>
          </Route>
          <Route path="/followers">
          <Navbar/>
            <SecondNavbar/>
            <Followers/>
          </Route>
          <Route path="/following">
          <Navbar/>
            <SecondNavbar/>
            <Following/>
          </Route>
          <Route path="/follow_request">
          <Navbar/>
            <SecondNavbar/>
            <FollowRequest/>
          </Route>
          <Route path="/chat/:id">
          <Navbar/>
            <SecondNavbar/>
            <ChatRoom/>
          </Route>
          <Route path="/edit_profile_pic">
          <Navbar/>
            <EditProfilePic/>
          </Route>
          <Route path="/addstory">
          <InstagramNavbar/>
          <Addstory/>
          </Route>
     </Switch>
  
     </Router>
     
    </div>
  );
}

export default App;
                                 





