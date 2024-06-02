import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [avatarPic, setAvatarPic] = useState("https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/06/Gandalf-Lord-Of-The-Rings-You-Shall-Not-Pass.jpg")

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
        setIsLoading(false);
        setUser(user);          
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