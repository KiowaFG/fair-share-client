import { useState } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Homepage from "./Pages/HomePage";
import SideBar from "./Components/SideBar";
import DetailsPage from "./Pages/DetailsPage";
import LandingPage from "./Pages/LandingPage";
import SignUpPage from "./Pages/SignUpPage";
import UserProfilePage from "./Pages/UserProfilePage";
import LoginPage from "./Pages/LoginPage";
import AddExpense from "./Components/Add/AddExpense";
import AddGroup from "./Components/Add/AddGroup";
import "./App.css";
import IsAnon from "./Components/IsAnon";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  let location = useLocation();

  function handleHideSidebar() {
    if (showSidebar) {
      setHideSidebar(true);
      setTimeout(() => {
        setShowSidebar(false);
      }, 480);
    }
    else {
      setShowSidebar(true);
      setHideSidebar(false);
    };
  };

  return (
    <>
      {!["/", "/signup", "/login"].includes(location.pathname) && <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} handleHideSidebar={handleHideSidebar} />}
      <div className="bodyView">
        {showSidebar && <SideBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} hideSidebar={hideSidebar} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<IsAnon><Homepage /></IsAnon>} />
          <Route path="/details/:groupId" element={<IsAnon><DetailsPage /></IsAnon>} />
          {/* <Route path="/addexpense" element={<AddExpense />} /> */}
          {/* <Route path="/addgroup" element={<AddGroup />} /> */}
          <Route path="/user" element={<IsAnon><UserProfilePage /></IsAnon>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
