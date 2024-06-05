import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect, useContext } from "react";
import ExpenseCard from "../Components/ExpenseCard";
import trashBin from "../assets/images/bin.png";
import { useNavigate } from "react-router-dom";
import "./DetailsPage.css";


const API_URL = import.meta.env.VITE_API_URL;

function DetailsPage(setShowAddGroup) {
    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [editMode, setEditMode] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [groupAuthor, setGroupAuthor] = useState("")
    const handleName = (e) => setName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value)
    const handleGroupAuthor = (e) => setGroupAuthor(e.target.value)

    const [calculations, setCalculations] = useState({
        paid: 0,
        borrowed: 0,
        balance: 0,
        total: 0
    })
    const [edit, setEdit] = useState(false)


    const getGroup = () => {
        axios
            .get(
                `${API_URL}/groups/details/${groupId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setGroup(response.data);
                const paid = Math.round(response.data.groupExpenses.reduce((acc, curr) => curr.expenseAuthor === user._id ? acc + curr.amount : acc + 0, 0));
                const borrowed = Math.round(response.data.groupExpenses.reduce((acc, curr) => curr.expenseAuthor !== user._id ? acc + Math.round(curr.amount / curr.expenseUsers.length) : acc + 0, 0));
                const total = Math.round(response.data.groupExpenses.reduce((acc, curr) => curr.expenseAuthor !== user._id ? acc + curr.amount : acc + 0, 0));
                const balance = paid - borrowed;
                setCalculations({
                    paid: paid,
                    borrowed: borrowed,
                    balance: balance,
                    total: total
                })
            })
            .catch((error) => console.log(error));
    }

    const deleteGroup = () => {
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

    useEffect(() => {
        getGroup();
    }, []);

    function handleEditMode() {
        if (editMode) {


            const inputs = {
                name,
                description,
                
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
                    getGroup()
                })
                .catch((error) => console.log(error));

        }
        else {


            setEditMode(true)
        }
    }

    return (
        <div className="detailsWrap">
            {group &&
                <div className="detailsPage">
                    <div className="titleAndBtns">
                        {editMode ? <input value={name} onChange={handleName} ></input> : <h3>{group.name}</h3>}
                        <img className="detailsPageImg" src={group.groupPic} alt="" />
                        {editMode ? <input value={description} onChange={handleDescription}></input> : <p>{`Description: ${group.description}`}</p>}
                        {editMode ? <input value={`Admin: ${groupAuthor.name} ${group.groupAuthor.lastName}`} onChange={handleGroupAuthor}></input> : <p>{`Admin: ${group.groupAuthor.name} ${group.groupAuthor.lastName}`}</p>}
                        <p>{`Date: ${group.createdAt.split("T")[0]}`}</p>
                        <h3>{`Total Trip: ${calculations.total} €`}</h3>
                        <h3>{`Total Balance: ${calculations.balance} €`}</h3>
                        <h3>{`Total Paid: ${calculations.paid} €`}</h3>
                        <h3>{`Total Borrowed: ${calculations.borrowed} €`}</h3>
                        <div className="Btns">
                            <button className="detailsbtn">Add Expense</button>
                            <button onClick={handleEditMode} className="detailsbtn">{editMode ? "Save" : "Edit Group"}</button>
                            <button onClick={deleteGroup} className="detailsbtn">Delete Group</button>
                        </div>
                    </div>
                    {group.groupExpenses ? group.groupExpenses.map((expense) => {
                        return (
                            <ExpenseCard key={expense._id} expense={expense} />
                        )
                    }) : <p>Loading expenses</p>}
                </div>
            }
        </div>



    )
}
export default DetailsPage