import { useContext } from "react";
import "./SideBar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context";

function SideBar({ hideSidebar, setShowAddExpense, setShowAddGroup, handleHideSidebar }) {

    const { logOut } = useContext(AuthContext);

    return (
        <div className={hideSidebar ? "sideBar slideout" : "sideBar"}>
            <Link to={"/home"}> <button onClick={() => {
                handleHideSidebar();
            }}>Home Page</button></Link>
            <button onClick={() => {
                setShowAddExpense(true);
                handleHideSidebar();
            }}>Add Expense</button>
            <button onClick={() => {
                setShowAddGroup(true);
                handleHideSidebar();
            }}>Add Group</button>
            <Link to={"/user"}><button onClick={() => {
                handleHideSidebar();
            }}>User Profile</button></Link>
            <button onClick={() => {
                logOut();
                handleHideSidebar();
            }}>Log Out</button>
        </div>
    )
}
export default SideBar