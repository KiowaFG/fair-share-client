import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Homepage from "./Pages/HomePage";
import SideBar from "./Components/SideBar";
import DetailsPage from "./Pages/DetailsPage";
import LandingPage from "./Pages/LandingPage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import axios from "axios"

const API__URL = import.meta.env.VITE_API_URL

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Header setShowSidebar={setShowSidebar} />
      <div className="bodyView">
        {showSidebar && <SideBar setShowSidebar={setShowSidebar} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/details/:groupId" element={<DetailsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
