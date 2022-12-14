import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import './tuiter.css'
import EditProfile from "../profile/edit-profile";
import MyTuits from "../profile/my-tuits.js";
import MyLikes from "../profile/my-likes.js";
import MyDislikes from "../profile/my-dislikes.js";
import Explore from "../explore";

import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import {Login} from "../profile/login";
import Movies from "../movies";
import MovieDetails from "../movies/details";
import Signup from "../profile/signup";

function Tuiter () {
  return(
    <HashRouter>
      <div className="container">
        <div className="ttr-tuiter">
          <div className="ttr-left-column">
            <Navigation/>
          </div>
          <div className="ttr-center-column">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path="/tuiter" element={<Home/>}/>
              <Route path="/tuiter/:uid" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/home/:uid" element={<Home/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/notifications" element={<Notifications/>}/>
              <Route path="/messages" element={<Messages/>}/>
              <Route path="/bookmarks" element={<Bookmarks/>}/>
              <Route path="/lists" element={<Lists/>}/>
              <Route path="/profile/*" element={<Profile/>}/>
              <Route path="/profile/edit" element={<EditProfile/>}/>
              <Route path="/profile/mytuits" element={<MyTuits/>}/>
              <Route path="/profile/mylikes" element={<MyLikes/>}/>
              <Route path="/profile/mydislikes" element={<MyDislikes/>}/>
              <Route path="/movies" element={<Movies/>}/>
              <Route path="/movies/:imdbID" element={<MovieDetails/>}/>
              <Route path="/more" element={<More/>}/>
            </Routes>
          </div>
          <div className="ttr-right-column">
            <WhatsHappening/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
export default Tuiter;