import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';

import "./Layout.css";

const Layout = () => {
  const [ profile, setProfile ] = useState();

  const setUserDetailsUsingCode = (googleLoginCode) => {    
    axios
      .get(`http://127.0.0.1:8000/auth/login/?code=${googleLoginCode}`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        Cookies.set(
            "emotipress_token",
            googleLoginCode,
            { expires: 7, secure: true });
      })
      .catch((err) => console.log("Error while setting user details: ", err));
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUserDetailsUsingCode(codeResponse.code),
    onError: (error) => console.log('Login Failed:', error),
    accessType: "offline",
    responseType: "code",
    prompt: "consent",
    flow: "auth-code"
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
      Cookies.remove("emotipress_token");
  };
  
  useEffect(() => {
    const token = Cookies.get("emotipress_token");
    if (token) {
      setUserDetailsUsingCode(token);
    }
  }, []);

  return (
    <>
      <div className="navMenu">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="strict-mode-demo">Strict Mode Demo</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/sendNotifications">SendNotifications</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              {profile ? (
                <div className="profileInfo">
                  <img src={profile.picture} alt="user image" />
                  <p>{profile.name}</p>
                  <p>{profile.email}</p>
                  <br />
                  <br />
                  <button onClick={logOut}>Log out</button>
                </div>
              ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="pageContent">
        <Outlet />
      </div>
    </>
  )
};

export default Layout;