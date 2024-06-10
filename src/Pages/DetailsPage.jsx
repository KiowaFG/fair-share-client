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
                            {editMode ? <input value={name} onChange={handleName} placeholder="New Group Name" /> : <h1>{group.name}</h1>}
                            <div className="titleAndBtns">
                                <div className="column">
                                    <img className="detailsPageImg" src={group.groupPic} alt="" />
                                </div>
                                <div className="div-left">
                                    {editMode ? <input value={description} onChange={handleDescription} placeholder="New Group Description"></input> : <p><span>Description: </span>{group.description}</p>}
                                    {editMode ? <Select options={selectUsers} onChange={handleSelectAdmin} placeholder="Select New Admin" /> : <p><span>Admin: </span>{`${group.groupAuthor.name} ${group.groupAuthor.lastName}`}</p>}
                                    <p ><span>Date: </span>{group.createdAt.split("T")[0]}</p>
                                </div>
                                <div className="detailsMetricsWrap">
                                    <p className="detailsMetric">{`Total Group Spent: ${calculations.total} €`}</p>
                                    <p className="detailsMetric">{`Total Paid: ${calculations.paid} €`}</p>
                                    <p className={calculations.balance < 0 ? "detailsMetric red" : "detailsMetric green"}>{`Total Balance: ${group.groupUsers.filter((userSarch) => userSarch._id === user._id)[0].balance} €`}</p>
                                </div>
                                <div className="Btns">
                                    <button onClick={() => setShowAddExpense(true)} className="button-details">Add Expense</button>
                                    <button onClick={handleEditMode} className="button-details">{editMode ? "Save" : "Edit Group"}</button>
                                    {editMode && <button onClick={() => setEditMode(false)} className="button-details">Cancel</button>}
                                    <button onClick={deleteGroup} className="button-details">Delete Group</button>
                                    {editGroupMessage && <p className="red">{editGroupMessage}</p>}
                                </div>
                            </div>

                            {group.groupExpenses ? group.groupExpenses.map((expense) => {
                                return (
                                    <ExpenseCard key={expense._id} expense={expense} getGroup={getGroup} groupId={groupId} />
                                )
                            }) : <p>Loading expenses</p>}
                        </div>
                    </div>
                    <div className="users-wrapper">
                        <h2 className="group-members">Group Members</h2>
                        {
                            group.groupUsers.map((user) => {
                                return (
                                    <div key={user._id} className="profile-details">
                                        <img className="user-profile-picture" src={user.profilePic} alt="" />
                                        <div>
                                            <p>{`${user.name} ${user.lastName}`}</p>
                                            <p>{user.balance < 0 ? "Owes: " : "Receives "}<span className={user.balance < 0 ? "red" : "green"}>{`${user.balance.toFixed(2)} €`}</span></p>
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