import "./SideBar.css"
import { useState } from 'react'
import Xicon from "../assets/X.png"
import { Link } from "react-router-dom"

function SideBar({ setShowSidebar, hideSidebar }) {



    return (
        <div className={hideSidebar ? "sideBar slideout" : "sideBar"}>

            <Link to={"/home"}> <button>Home Page</button></Link>

            <button>All Expenses </button> {/* revisit */}
            <button>Add Expense</button>
            <button>Add Group</button>

        </div>
    )
}
export default SideBar