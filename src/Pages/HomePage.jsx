import "../App.css"
import "./HomePage.css"
import { Link } from "react-router-dom"
import Header from "../Components/Header"
import SideBar from "../Components/SideBar"
import Overview from "../Components/Overview"
import Expenses from "../Components/Expenses"

function Homepage() {
    return (
        <>
            <Header />
            <div className="bodyView">
                <SideBar />
                <div className="overviewExpenses">
                    <Overview />
                    <Expenses />
                </div>
            </div>
        </>
    )
}
export default Homepage