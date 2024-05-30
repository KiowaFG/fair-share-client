import "./SideBar.css"
import { useState } from 'react'
import Xicon from "../assets/X.png"
import { Link } from "react-router-dom"

function SideBar({ setShowSidebar }){

    const [hideSidebar, setHideSidebar]= useState(false)

    function handleHideSidebar (){
        setHideSidebar(true)
        setTimeout(() => {
            setShowSidebar(false)
        }, 480);
        
    }

    return(
        <div className={hideSidebar ? "sideBar slideout" : "sideBar"}>
            <img className="closeBtn" onClick={() => handleHideSidebar()}  src={Xicon} alt="" />
            
            <Link to={"/home"}> <button>Home Page</button></Link>
            
            <button>All Expenses </button>
            <button>Add Expense</button>
            <button>Add Group</button>

        </div>
    )
}
export default SideBar