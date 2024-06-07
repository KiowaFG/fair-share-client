import axios from "axios";
import { useContext, useState } from "react";
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
import IsPrivate from "./Components/IsPrivate";
import "./App.css";
import { AuthContext } from "./context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const storedToken = localStorage.getItem("authToken");
  let location = useLocation();
  const {user} = useContext(AuthContext)
  const [newBalance, setNewBalance] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)
  const [hideSidebar, setHideSidebar] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddExpense, setShowAddExpense] = useState(false)

  const [group, setGroup] = useState(null);
  const [calculations, setCalculations] = useState({
    paid: 0,
    borrowed: 0,
    balance: 0,
    total: 0
  });

  const getGroup = (groupId) => {
    axios
      .get(
        `${API_URL}/groups/details/${groupId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        let data = response.data;
        data = getBalance(data);
        setGroup(data);
        const paid = Math.round(data.groupExpenses.reduce((acc, curr) => curr.expenseAuthor === user._id ? acc + curr.amount : acc + 0, 0));
        const borrowed = Math.round(data.groupExpenses.reduce((acc, curr) => curr.expenseAuthor !== user._id ? acc + Math.round(curr.amount / curr.expenseUsers.length) : acc + 0, 0));
        const total = Math.round(data.groupExpenses.reduce((acc, curr) =>  acc + curr.amount, 0));
        const balance = paid - borrowed;
        setCalculations({
          paid: paid,
          borrowed: borrowed,
          balance: balance,
          total: total
        });
      })
      .catch((error) => console.log("error look here"));
  };

  const getBalance = (data) => {
    const user_set = data.groupUsers.map(user => { return { id: user._id, paid: 0, contributed: 0 } });

    user_set.forEach((user) => {
      let paid = 0;
      let contributed = 0;
      data.groupExpenses.forEach((expense) => {
        if (expense.expenseAuthor === user.id) {
          paid += expense.amount;
        };
        if (expense.expenseUsers.includes(user.id)) {
          contributed += expense.amount / expense.expenseUsers.length;
        };
      })
      user.paid = paid;
      user.contributed = contributed;
    });

    user_set.forEach((user) => {
      user.paid = Number(user.paid.toFixed(2));
      user.contributed = Number(user.contributed.toFixed(2));
      user.balance = user.paid - user.contributed;
    });


    data.groupUsers.forEach((user1) => {
      user_set.map((user2) => {
        user1._id === user2.id ? user1.balance = user2.balance : false;
      });
    });

    return data;
  };

  function handleHideSidebar() {
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
        {showSidebar && <SideBar handleHideSidebar={handleHideSidebar} setShowAddGroup={setShowAddGroup} setShowAddExpense={setShowAddExpense} setShowSidebar={setShowSidebar} showSidebar={showSidebar} hideSidebar={hideSidebar} />}
        {showAddExpense && <AddExpense setShowAddExpense={setShowAddExpense} getGroup={getGroup} />}
        {showAddGroup && <AddGroup setShowAddGroup={setShowAddGroup} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<IsPrivate><Homepage /></IsPrivate>} />
          <Route path="/details/:groupId" element={<IsPrivate><DetailsPage setShowAddExpense={setShowAddExpense} getGroup={getGroup} group={group} calculations={calculations} /></IsPrivate>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<IsPrivate><UserProfilePage /></IsPrivate>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
