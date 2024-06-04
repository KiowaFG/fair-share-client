import "./DetailsPage.css"
import downArrow from "../assets/DownArrow.svg"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL

function DetailsPage(setShowAddGroup) {
    const storedToken = localStorage.getItem("authToken");
    const [group, setGroup] = useState({})
    const { groupId } = useParams();
    const navigate = useNavigate();

    const getGroup = () => {
        axios
            .get(
                `${API_URL}/groups/details/${groupId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneGroup = response.data;
                setGroup(oneGroup);
            })
            .catch((error) => console.log(error));
        }
        
        const deleteGroup = ()=>{
            axios
            .delete(
                `${API_URL}/groups/${groupId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log("The group has been deleted",response);
                navigate("/home")
            })
            .catch((error) => console.log(error));
            
    }


    useEffect(() => {
        getGroup();
    }, []);


    return (



        <div className="detailsWrap">
            <div className="detailsPage">
                <img className="detailsPageImg" src="https://images.delunoalotroconfin.com/Content/images/000/Productos/Prod_2828_1.jpg" alt="" />
                <div className="titleAndBtns">
                    <h2>{group.name}</h2>
                    <h3>Total expense: 900€</h3>
                    <div className="Btns">
                        <button className="detailsbtn">Add Expense</button>
                        <button onClick={() => setShowAddGroup(true)} className="detailsbtn">Edit Group</button>
                        <button onClick={deleteGroup} className="detailsbtn">Delete Group</button>
                    </div>
                </div>

                {group.expenses? group.expenses.map((expense) => {
                    return (

                        <div className="expenseItem">
                            <p>Name: {expense.name}</p>
                            <p>Price: {expense.amount}€</p>
                            <p>Date: 15/6/2024</p>
                            <img src={downArrow} alt="" />
                        </div>
                    )
                }): <p>Loading expenses</p> }
            </div>

        </div>



    )
}
export default DetailsPage