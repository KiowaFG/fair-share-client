import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }  

  const authenticateUser = () => {            
    
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
     
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
         
        const {_id, name} = response.data;
        
        console.log(response);

        setIsLoggedIn(true);
        setIsLoading(false);
        setUserName(name);   
        setUserId(_id);        
      })
      .catch((error) => {
             
        setIsLoggedIn(false);
        setIsLoading(false);
        setUserName(null);   
        setUserId(null);        
      });      
    } else {
      
        setIsLoggedIn(false);
        setIsLoading(false);
        setUserName(null);
        setUserId(null);      
    }   
  }

  
  useEffect(() => {   
    authenticateUser();                                                
    
  }, []);

  
  return (                                                   
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        userName,
        userId,
        storeToken,
        authenticateUser        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };