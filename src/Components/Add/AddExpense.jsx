
import React, { useState } from 'react';
import "./AddExpense.css"

function AddExpense() {
    
    const [formData, setFormData] = useState({
        name: '',
        concept: '',
        amount: ''
    });

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
       
        setFormData({
            name: '',
            concept: '',
            amount: ''
        });
    };

    return (
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
                <label>Concept:</label>
                <input
                    type="text"
                    name="concept"
                    value={formData.concept}
                    onChange={handleChange}
                />
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
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default AddExpense;
