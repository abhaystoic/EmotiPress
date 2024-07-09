import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import "./Layout.css";

const Layout = () => {
  const [ user, setUser ] = useState();
  const [ profile, setProfile ] = useState();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
    // accessType: "offline",
    // responseType: "code",
    // prompt: "consent",
    // flow: "auth-code"
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      <div className="navMenu">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
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
              <Link to="/blogs">Lambda News</Link>
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