import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import "./SideBar.css"

function SideBar({ hideSidebar, setShowAddExpense, setShowAddGroup, handleHideSidebar }) {

    const { logOut } = useContext(AuthContext);

    return (
        <div className={hideSidebar ? "sideBar slideout" : "sideBar"}>
            <h3>Fair Share</h3>
            <button className="button-sidebar" onClick={() => {
                handleHideSidebar();
            }}><Link to={"/home"}> Home Page</Link></button>
            <button className="button-sidebar" onClick={() => {
                setShowAddExpense(true);
                handleHideSidebar();
            }}>Add Expense</button>
            <button className="button-sidebar" onClick={() => {
                setShowAddGroup(true);
                handleHideSidebar();
            }}>Add Group</button>
            <button className="button-sidebar" onClick={() => {
                handleHideSidebar();
            }}><Link to={"/user"}>User Profile</Link></button>
            <button className="button-sidebar" onClick={() => {
                logOut();
                handleHideSidebar();
            }}>Log Out</button>
        </div>
    )
}
export default SideBar