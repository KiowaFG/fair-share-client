import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Pages/HomePage";
import SideBar from "./Components/SideBar";
import DetailsPage from "./Pages/DetailsPage";
import LandingPage from "./Pages/LandingPage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AddExpense from "./Components/Add/AddExpense"
import AddGroup from "./Components/Add/AddGroup"
import axios from "axios"

const API__URL = import.meta.env.VITE_API_URL

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [hideSidebar, setHideSidebar]= useState(false)

  function handleHideSidebar (){
    if (showSidebar) {
      setHideSidebar(true)
      setTimeout(() => {
        setShowSidebar(false)
      }, 480);
    }
    else{
      setShowSidebar(true)
      setHideSidebar(false)
    }
      
  }

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} handleHideSidebar={handleHideSidebar} />
      <div className="bodyView">
        {showSidebar && <SideBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} hideSidebar={hideSidebar} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/details/:groupId" element={<DetailsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addexpense" element={<AddExpense/>} />
          <Route path="/addgroup" element={<AddGroup/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
