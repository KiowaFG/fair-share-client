
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import supabase from '../../utils/config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import closeBtn from "../../assets/X.png"
import "./AddExpense.css"

const API_URL = import.meta.env.VITE_API_URL

function AddExpense({ setShowAddExpense, getGroup }) {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const [group, setGroup] = useState("");
    const [selectGroup, setSelectGroup] = useState("");
    const [selectPayers, setSelectPayer] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        concept: '',
        amount: '',
        group: '',
        expenseAuthor: user._id,
        expenseUsers: '',
        expensePic: "https://tgcxojdndrjkwxfwxjvw.supabase.co/storage/v1/object/public/fair-share/profile_picture_6659aedd0ba6e3a417794481_795878.png"
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

        axios.post(
            `${API_URL}/expenses/`,
            formData,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                const expenseId = response.data._id;
                const groupId = response.data.group;
                axios.put(
                    `${API_URL}/groups/${groupId}/${expenseId}`,
                    { expenseId, groupId },
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                    .then((updatedGroup) => {
                        getGroup(groupId);
                        navigate(`/details/${formData.group}`);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => { console.log("there has been an error") })
    };

    const getSelectGroup = () => {
        axios
            .get(
                `${API_URL}/groups/${user._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then((response) => {
                const data = response.data;
                setGroup(response.data);
                setSelectGroup(data.map((group) => { return { value: group._id, label: group.name } }))
            })
            .catch((error) => console.log(error));
    }

    const handleSelectGroup = (e) => {
        const group_filtered = group.filter((group) => group._id === e.value);
        setSelectPayer(group_filtered[0].groupUsers.map((user) => { return { value: user._id, label: `${user.name} ${user.lastName}` } }));
        setFormData({
            ...formData,
            group: e.value
        });
    };

    const handleSelectPayer = (e) => {
        const users_selected = e.map((user) => user.value);
        setFormData({
            ...formData,
            expenseUsers: users_selected
        });
    };

    const uploadImage = async (e) => {
        const expenseFile = e.target.files[0];
        const randomName = `expense_picture_${user._id}_${Math.ceil(Math.random() * 1000000)}`
        const { data, error } = await supabase.storage
            .from("fair-share")
            .upload(`${randomName}.png`, expenseFile, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.log("Error uploading file: ", error.message);
            return;
        };

        const pic_path = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

        setFormData({
            ...formData,
            expensePic: pic_path
        });
    };

    useEffect(() => {
        getSelectGroup();
    }, []);

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
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Concept:</label>
                        <select name="concept" onChange={handleChange} value={formData.concept}>
                            <option value="---">--</option>
                            <option value="Food">Food</option>
                            <option value="Savings">Savings</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Housing">Housing</option>
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
                        <Select options={selectGroup} name="group" onChange={handleSelectGroup} />
                    </div>
                    <div>
                        <label>Expense Payers:</label>
                        <Select options={selectPayers} name="expenseUsers" onChange={handleSelectPayer} isMulti />
                    </div>
                    <div>
                        <label> Image:</label>
                        <input
                            type="file"
                            name="image"
                            value={formData.image}
                            onChange={uploadImage}
                        />
                        {formData.groupPic && <img className='group-picture' src={formData.groupPic}></img>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddExpense;
