import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [avatarPic, setAvatarPic] = useState("https://tgcxojdndrjkwxfwxjvw.supabase.co/storage/v1/object/public/fair-share/profile_picture_6659aedd0ba6e3a417794481_4391.png")

  let location = useLocation();
  const navigate = useNavigate();
  
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = () => {            
    
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
     
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
         
        const user = response.data;

        setIsLoggedIn(true);
        location.pathname === "/login" && navigate("/home");
        setIsLoading(false);
        setUser(user);  
        setAvatarPic(user.profilePic);
      })
      .catch((error) => {
             
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);   
      });      
    } else {
      
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
    }   
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setAvatarPic("https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/06/Gandalf-Lord-Of-The-Rings-You-Shall-Not-Pass.jpg")
    navigate("/login");
  };
  
  useEffect(() => {   
    authenticateUser();                                                
  }, []);
  
  return (                                                   
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        avatarPic,
        setUser,
        storeToken,
        authenticateUser,
        logOut,
        setAvatarPic
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };