import "./SideBar.css"
import { useState } from 'react'
import Xicon from "../assets/X.png"
import { Link } from "react-router-dom"

function SideBar({ setShowSidebar,hideSidebar,setShowAddExpense,setShowAddGroup }){



    return (
        <div className={hideSidebar ? "sideBar slideout" : "sideBar"}>

            <Link to={"/home"}> <button>Home Page</button></Link>
            
            <button>All Expenses </button>
            <button onClick={() => setShowAddExpense(true)}>Add Expense</button>
            <button onClick={() => setShowAddGroup(true)}>Add Group</button> 

        </div>
    )
}
export default SideBar