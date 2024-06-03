import React, { useState } from 'react';
import "./AddGroup.css"

function AddGroup() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        users: '' 
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();  
        console.log(formData);  
        
        setFormData({
            name: '',
            description: '',
            users: ''
        });
    };

    return (
        <div className='groupFrom'>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}/>
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}/>
            </div>
            <div>
                <label>Users:</label>
                <input
                    type="text"
                    name="users"
                    value={formData.users}
                    onChange={handleChange}/>
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default AddGroup;