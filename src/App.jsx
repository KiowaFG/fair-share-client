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

  const [hideSidebar, setHideSidebar]= useState(false)

  const [showAddGroup, setShowAddGroup]=useState(false)

  const [ showAddExpense, setShowAddExpense]=useState(false)

  function handleHideSidebar (){
    if (showSidebar) {
      setHideSidebar(true);
      setTimeout(() => {
        setShowSidebar(false);
      }, 480);
    } else {
      setShowSidebar(true);
      setHideSidebar(false);
    };
  };

  return (
    <>
      {!["/", "/signup", "/login"].includes(location.pathname) && <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} handleHideSidebar={handleHideSidebar} />}
      <div className="bodyView">
        {showSidebar && <SideBar setShowAddGroup={setShowAddGroup} setShowAddExpense={setShowAddExpense} setShowSidebar={setShowSidebar} showSidebar={showSidebar} hideSidebar={hideSidebar} />}
        {showAddExpense && <AddExpense setShowAddExpense={setShowAddExpense}/>}
        {showAddGroup && <AddGroup setShowAddGroup={setShowAddGroup}/>}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/details/:groupId" element={<DetailsPage setShowAddGroup={setShowAddGroup} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
