
import React, { useState } from 'react';
import "./AddExpense.css"
import { Navigate, useNavigate } from 'react-router-dom';
import closeBtn from "../../assets/X.png"
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

const API_URL = import.meta.env.VITE_API_URL

function AddExpense({ setShowAddExpense }) {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        concept: '',
        amount: '',
        group: '',
        expenseAuthor: user._id,
        expensePayers: []
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.post(`${API_URL}/expenses/`, formData)
            .then((data) => { navigate("/home") })
            .catch((error) => { console.log("there has been an error") })

    };

    return (
        <div className='formWraper'>
            <img onClick={() => setShowAddExpense(false)} className='closeBtn' src={closeBtn} alt="" />
            <div className='expenseForm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="concept"
                            value={formData.concept}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Concept:</label>
                        <select name="users">
                            <option value="32342432">--</option>
                            <option value="3232432">Food</option>
                            <option value="32342432">Savings</option>
                            <option value="323432">Transportation</option>
                            <option value="1112">Personal Care</option>
                            <option value="2345666">Entertainment</option>
                            <option value="3234211432">Healthcare</option>
                            <option value="11333">Housing</option>
                        </select>
                    </div>
                    <div>
                        <label>Amount (€):</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Group:</label>
                        <input
                            type="text"
                            name="concept"
                            value={formData.concept}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Expense Payers:</label>
                        <input
                            type="text"
                            name="concept"
                            value={formData.concept}
                            onChange={handleChange}
                        />
                    </div>


                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddExpense;
