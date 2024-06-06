
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import supabase from '../../utils/config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import closeBtn from "../../assets/close.png"
import "./AddExpense.css"

const API_URL = import.meta.env.VITE_API_URL

function AddExpense({ setShowAddExpense, getGroup, handleHideSidebar }) {
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const [group, setGroup] = useState("");
    const [selectGroup, setSelectGroup] = useState("");
    const [selectPayers, setSelectPayer] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    let pic_path = null;

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

        if (Object.values(formData).includes("")) {
            setErrorMessage("Please fill all the information");
            setTimeout(() => { setErrorMessage(null) }, 2000);
        } else {
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
                            setErrorMessage("Expense added!");
                            setTimeout(() => {
                                setErrorMessage(null);
                                setShowAddExpense(false);
                                navigate(`/details/${formData.group}`);
                            }, 1000);
                        })
                        .catch((error) => console.log(error));
                })
                .catch((error) => { console.log("there has been an error") })
        };
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

        pic_path = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

        setFormData({
            ...formData,
            expensePic: pic_path
        });
    };

    useEffect(() => {
        getSelectGroup();
    }, []);

    return (
        <div className='formWraperWraper'>
            <div className='formWraper'>
                {/* <img onClick={() => setShowAddExpense(false)} className='closeBtn' src={closeBtn} alt="" /> */}
                <div className='expenseForm'>
                    <form onSubmit={handleSubmit}>
                        <div className='column-form'>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='column-form'>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='column-form'>
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
                        <div className='column-form'>
                            <label>Amount (€):</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='column-form'>
                            <label>Group:</label>
                            <Select options={selectGroup} name="group" onChange={handleSelectGroup} />
                        </div>
                        <div className='column-form'>
                            <label>Expense Payers:</label>
                            <Select options={selectPayers} name="expenseUsers" onChange={handleSelectPayer} isMulti />
                        </div>
                        <div className='column-form'>
                            <label> Image:</label>
                            <div className='row-form1'>
                                <input
                                    type="file"
                                    name="image"
                                    value={formData.image}
                                    onChange={uploadImage}
                                />
                                {formData.expensePic && <img className='expense-form-picture' src={formData.expensePic}></img>}
                            </div>
                        </div>
                        <div className='row-form2'>
                            <button className='button-form' type="submit">Submit</button>
                            <button className="button-form" onClick={() => setShowAddExpense(false)}>Cancel</button>
                        </div>
                        {errorMessage && <p className={errorMessage === "Expense added!" ? "message-green" : "message-red"}>{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddExpense;
