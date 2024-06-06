import axios from "axios";
import supabase from "../utils/config";
import { useContext, useEffect, useState } from "react";
import Select from 'react-select';
import { AuthContext } from "../context/auth.context";
import trashBin from "../assets/images/bin.png";
import glassIcon from "../assets/images/magnifying-glass.png";
import editIcon from "../assets/images/edit.png";
import "./ExpenseCard.css"; 
import closeBtn from"../assets/X.png"; 


const API_URL = import.meta.env.VITE_API_URL;

function ExpenseCard({ expense, getGroup, groupId }) {
    const storedToken = localStorage.getItem("authToken");
    const [showInfo, setShowInfo] = useState("content-not-visible");
    const [expenseInfo, setExpenseInfo] = useState("");
    const { user } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [selectPayer, setSelectPayer] = useState("");
    const [editMessage, setEditMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        concept: '',
        amount: '',
        expenseAuthor: '',
        expenseUsers: '',
        expensePic: expenseInfo.expensePic
    })

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeUsers = (e, type) => {
        if (type === "author") {
            setFormData({
                ...formData,
                expenseAuthor: e.value
            });
        } else {
            const users_selected = e.map((user) => user.value);
            setFormData({
                ...formData,
                expenseUsers: users_selected
            });
        };
    };

    const handleSubmit = () => {
        if (formData.expensePic === null) {
            setFormData({ ...formData, expensePic: "https://tgcxojdndrjkwxfwxjvw.supabase.co/storage/v1/object/public/fair-share/profile_picture_6659aedd0ba6e3a417794481_795878.png" })
        };
        if (Object.values(formData).includes("")) {
            setEditMessage("Please fill all the information");
            setTimeout(() => { setEditMessage(null) }, 2000);
        } else {
            if (expenseInfo.expenseAuthor._id !== user._id) {
                setEditMessage("Only expense author can edit this item");
                setTimeout(() => { setEditMessage(null) }, 2000);
            } else {
                axios.put(
                    `${API_URL}/expenses/${expense._id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                    .then((updatedExpense) => {
                        setEditMessage("Expense updated");
                        setTimeout(() => {
                            setShowInfo("content-not-visible")
                            setEditMessage(null);
                            setEditMode(false);
                            displayInfo();
                            getGroup(groupId);
                        }, 2000)
                    })
                    .catch((error) => console.log(error));
            };
        };
        setFormData({
            name: '',
            description: '',
            concept: '',
            amount: '',
            expenseAuthor: '',
            expenseUsers: '',
            expensePic: expenseInfo.expensePic
        })
    };

    const displayInfo = () => {
        axios
            .get(
                `${API_URL}/expenses/details/${expense._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setExpenseInfo(response.data);
                setFormData({ ...formData, expensePic: response.data.expensePic })
                showInfo === "content-not-visible" ? setShowInfo("content-visible") : setShowInfo("content-not-visible");
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = () => {
        if (expenseInfo.expenseAuthor._id !== user._id) {
            setEditMessage("Please fill all the information");
            setTimeout(() => { setEditMessage(null) }, 2000);
        } else {
            axios
                .delete(
                    `${API_URL}/expenses/${expense.group}/${user._id}/${expense._id}`,
                    { headers: { Authorization: `Bearer ${storedToken}` } },
                )
                .then((response) => {
                    console.log(response.message);
                    getGroup(groupId);
                })
                .catch((error) => console.log(error.response.data.message));
        };
    };

    const getPayers = () => {
        axios
            .get(
                `${API_URL}/groups/details/${groupId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then((response) => {
                const data = response.data.groupUsers;
                setSelectPayer(data.map((group) => { return { value: group._id, label: group.name } }))
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="expenseCard-wrapper">
            <div className="expenseItem">
                {showInfo === "content-not-visible" &&
                    <div className="column-div">
                        <p>Name:</p>
                        <p>{expense.name}</p>
                    </div>
                }
                {showInfo === "content-not-visible" &&
                    <div className="column-div">
                        <p>Price:</p>
                        <p>{expense.amount} €</p>
                    </div>
                }
                {showInfo === "content-not-visible" &&
                    <div className="column-div">
                        <p>Date:</p>
                        <p>{expense.createdAt.split("T")[0]}</p>
                    </div>
                }
                <div className="expenseCardImg">
                    {showInfo === "content-not-visible" && <img className="glassIcon-image" src={glassIcon} alt="" onClick={displayInfo} />}
                    {showInfo === "content-not-visible" && <img className="trash-bin-image" src={trashBin} alt="" onClick={handleDelete} />}
                </div>
            </div>
            {expenseInfo &&
                <div className={showInfo}>
                    <div className="imgInDetails">
                    <img className="trash-bin-image" src={editMode ? closeBtn : glassIcon} alt="" onClick={displayInfo} />
                    <img className="trash-bin-image" src={editIcon} alt="" onClick={() => {
                        setEditMode(true);
                        getPayers();
                    }} />
                    <img className="trash-bin-image" src={trashBin} alt="" onClick={handleDelete} />
                    </div>
                    <div>
                    {editMode ? <input type="text" placeholder="Name of expense" name="name" onChange={handleChange} /> : <p>{`Name: ${expenseInfo.name}`}</p>}
                    {editMode ? <select name="concept" onChange={handleChange} >
                        <option value="---">--</option>
                        <option value="Food">Food</option>
                        <option value="Savings">Savings</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Housing">Housing</option>
                    </select> : <p>{`Concept: ${expenseInfo.concept}`}</p>}
                    {editMode ? <input type="text" placeholder="Description of expense" name="description" onChange={handleChange} /> : <p>{`Description: ${expenseInfo.description}`}</p>}
                    {editMode ? <Select options={selectPayer} name="expenseAuthor" onChange={(e) => handleChangeUsers(e, "author")} /> : <p>{`Paid by: ${expenseInfo.expenseAuthor.name} ${expenseInfo.expenseAuthor.lastName}`}</p>}
                    <p>{`Expense Date: ${expenseInfo.createdAt.split("T")[0]}`}</p>
                    <p>{`Last Update: ${expenseInfo.updatedAt.split("T")[0]}`}</p>
                    {editMode ? <input type="number" name="amount" placeholder="set the amount" onChange={handleChange} /> : <p>{`Price: ${expenseInfo.amount} €`}</p>}
                    {
                        editMode ? <Select options={selectPayer} name="expenseUsers" onChange={(e) => handleChangeUsers(e, "payers")} isMulti /> : <ul>Expense Participants:
                            {
                                expenseInfo.expenseUsers.map((user, index) => {
                                    return (
                                        <li key={`expense_card ${index}`}>{`${user.name} ${user.lastName}`}</li>
                                    )
                                })
                            }
                        </ul>
                    }
                    {editMode ? <input type="file" onChange={uploadImage} /> : <img className="expense-picture" src={expenseInfo.expensePic} alt="" />}
                    {editMode && <img src={formData.expensePic} />}
                    </div>
                    {editMode && <button onClick={handleSubmit}>Save</button>}
                    {editMode && <button onClick={() => setEditMode(false)}>Cancel</button>}
                    {editMessage && <p>{editMessage}</p>}
                </div>
            }
        </div>
    );

}
export default ExpenseCard;