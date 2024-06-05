import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import ExpenseCard from "../Components/ExpenseCard";
import "./DetailsPage.css";


const API_URL = import.meta.env.VITE_API_URL;

function DetailsPage({ setShowAddExpense, getGroup, calculations, group }) {
    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectUsers, setSelectUsers] = useState("");
    const [selectAdmin, setSelectAdmin] = useState(null);
    const handleName = (e) => setName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value)

    const [editGroupMessage, setEditGroupMessage] = useState(null)

    const deleteGroup = () => {
        if (group.groupAuthor._id !== user._id) {
            console.log(group);
            setEditGroupMessage("You are not the admin of this group");
            setTimeout(() => { setEditGroupMessage(null) }, 3000);
        } else {
            axios
                .delete(
                    `${API_URL}/groups/${groupId}`,
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                .then((response) => {
                    console.log("The group has been deleted", response);
                    navigate("/home")
                })
                .catch((error) => console.log(error));
        };
    };

    const handleSelectUsers = () => {
        axios
            .get(
                `${API_URL}/groups/details/${groupId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                let data = response.data.groupUsers;
                setSelectUsers(data.map((user) => { return { value: user._id, label: `${user.name} ${user.lastName}` } }));
            })
            .catch((error) => console.log(error));
    };

    const handleSelectAdmin = (e) => {
        setSelectAdmin(e.value);
        console.log(selectAdmin);
    };

    function handleEditMode() {
        if (group.groupAuthor._id !== user._id) {
            setEditGroupMessage("You are not the admin of this group");
            setTimeout(() => { setEditGroupMessage(null) }, 3000);
        } else {
            if (editMode) {
                const inputs = {
                    name,
                    description,
                    groupAuthor: selectAdmin === null ? group.groupAuthor._id : selectAdmin,
                }
                axios
                    .put(
                        `${API_URL}/groups/${groupId}`,
                        inputs,
                        { headers: { Authorization: `Bearer ${storedToken}` } }
                    )
                    .then((response) => {
                        console.log("The group has been updated", response);
                        setEditMode(false)
                        getGroup(groupId)
                    })
                    .catch((error) => console.log(error));
            }
            else {
                setEditMode(true)
            };
        };
    };

    useEffect(() => {
        getGroup(groupId);
        handleSelectUsers();
    }, [groupId]);

    return (
        <div className="detailsWrap-outter">
            {group &&
                <>
                    <div className="detailsWrap-inner">
                        <div className="detailsPage">
                            <div className="titleAndBtns">
                                {editMode ? <input value={name} onChange={handleName} placeholder="New Group Name" ></input> : <h3>{group.name}</h3>}
                                <img className="detailsPageImg" src={group.groupPic} alt="" />
                                {editMode ? <input value={description} onChange={handleDescription} placeholder="New Group Description"></input> : <p>{`Description: ${group.description}`}</p>}
                                {editMode ? <Select options={selectUsers} onChange={handleSelectAdmin} placeholder="Select New Admin" /> : <p>{`Admin: ${group.groupAuthor.name} ${group.groupAuthor.lastName}`}</p>}
                                <p>{`Date: ${group.createdAt.split("T")[0]}`}</p>
                                <h3>{`Total Trip: ${calculations.total} €`}</h3>
                                <h3>{`Total Balance: ${calculations.balance} €`}</h3>
                                <h3>{`Total Paid: ${calculations.paid} €`}</h3>
                                <h3>{`Total Borrowed: ${calculations.borrowed} €`}</h3>
                                <div className="Btns">
                                    <button onClick={() => setShowAddExpense(true)} className="detailsbtn">Add Expense</button>
                                    <button onClick={handleEditMode} className="detailsbtn">{editMode ? "Save" : "Edit Group"}</button>
                                    {editMode && <button onClick={() => setEditMode(false)} className="detailsbtn">Cancel</button>}
                                    <button onClick={deleteGroup} className="detailsbtn">Delete Group</button>
                                </div>
                                {editGroupMessage && <p>{editGroupMessage}</p>}
                            </div>

                            {group.groupExpenses ? group.groupExpenses.map((expense) => {
                                return (
                                    <ExpenseCard key={expense._id} expense={expense} getGroup={getGroup} groupId={groupId} />
                                )
                            }) : <p>Loading expenses</p>}
                        </div>
                    </div>
                    <div className="users-wrapper">
                        {
                            group.groupUsers.map((user) => {
                                return (
                                    <div key={user._id} className="profile-details">
                                        <img className="user-profile-picture" src={user.profilePic} alt="" />
                                        <div>
                                            <p>{`${user.name} ${user.lastName}`}</p>
                                            <p>{`${user.balance} €`}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </div>



    )
}
export default DetailsPage