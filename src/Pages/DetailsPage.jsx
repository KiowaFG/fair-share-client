import "./DetailsPage.css"
import downArrow from "../assets/DownArrow.svg"
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL

function DetailsPage() {

const [group, setGroup] = useState({})
const { groupId } = useParams();

const getGroup =()=>{
    axios
    .get(`${API_URL}/groups/${groupId}`)
    .then((response) => {
        const oneGroup = response.data;
        setGroup(oneGroup);
      })
      .catch((error) => console.log(error));
}

useEffect(()=> {            
    getGroup();
  }, [] );


    return (
        <div className="detailsWrap">
            <div className="detailsPage">
                    <img className="detailsPageImg" src="https://images.delunoalotroconfin.com/Content/images/000/Productos/Prod_2828_1.jpg" alt="" />
                    <div className="titleAndBtns">
                        <h2>{group.name}</h2>
                        <h3>Total expense: 900€</h3>
                        <div className="Btns">
                            <button className="detailsbtn">Add Expense</button>
                            <button className="detailsbtn">Settle Up</button>
                        </div>
                    </div>
                <div className="expenseItem">
                    <p>Name: visas</p>
                    <p>Price: 300€</p>
                    <p>Date: 15/6/2024</p>
                    <img src={downArrow} alt="" />
                </div>
            </div>

        </div>
    )
}
export default DetailsPage