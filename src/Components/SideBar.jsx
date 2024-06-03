import "./SideBar.css"
import { useState } from 'react'
import Xicon from "../assets/X.png"
import { Link } from "react-router-dom"

function SideBar({ setShowSidebar,hideSidebar }){



    return(
        <div className={hideSidebar ? "sideBar slideout" : "sideBar"}>
            
            <Link to={"/home"}> <button>Home Page</button></Link>
            
            <button>All Expenses </button>
           <Link to={"/addexpense"}> <button>Add Expense</button> </Link>
           <Link to={"/addgroup"}> <button>Add Group</button> </Link>

        </div>
    )
}
export default SideBar