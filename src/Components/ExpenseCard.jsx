import axios from "axios";
import { useContext, useState } from "react";
import trashBin from "../assets/images/bin.png";
import "./ExpenseCard.css";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function ExpenseCard({ expense }) {
    const storedToken = localStorage.getItem("authToken");
    const [showInfo, setShowInfo] = useState("content-not-visible");
    const [expenseInfo, setExpenseInfo] = useState("");
    const { user } = useContext(AuthContext);

    const displayInfo = () => {
        axios
            .get(
                `${API_URL}/expenses/details/${expense._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setExpenseInfo(response.data);
                showInfo === "content-not-visible" ? setShowInfo("content-visible") : setShowInfo("content-not-visible");
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = () => {
        axios
            .delete(
                `${API_URL}/expenses/${expense.group}/${user._id}/${expense._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then((response) => console.log(response.message))
            .catch((error) => console.log(error.response.data.message));
    };

    return (
        <div className="expenseCard-wrapper">
            <div className="expenseItem" onClick={displayInfo}>
                <p>{showInfo === "content-not-visible" && `Name: ${expense.name}`}</p>
                <p>{showInfo === "content-not-visible" && `Price: ${expense.amount} €`}</p>
                <p>{showInfo === "content-not-visible" && `Date: ${expense.createdAt.split("T")[0]}`}</p>
                <img className="trash-bin-image" src={trashBin} alt="" onClick={handleDelete}/>
            </div>
            {expenseInfo &&
                <div className={showInfo} onClick={displayInfo}>
                    <p>{`Name: ${expenseInfo.name}`}</p>
                    <p>{`Concept: ${expenseInfo.concept}`}</p>
                    <p>{`Description: ${expenseInfo.description}`}</p>
                    <p>{`Paid by: ${expenseInfo.expenseAuthor.name} ${expenseInfo.expenseAuthor.lastName}`}</p>
                    <p>{`Expense Date: ${expenseInfo.createdAt.split("T")[0]}`}</p>
                    <p>{`Last Update: ${expenseInfo.updatedAt.split("T")[0]}`}</p>
                    <p>{`Price: ${expenseInfo.amount} €`}</p>
                    <ul>Expense Participants:
                        {
                            expenseInfo.expenseUsers.map((user, index) => {
                                return (
                                    <li key={`expense_card ${index}`}>{`${user.name} ${user.lastName}`}</li>
                                )
                            })
                        }
                    </ul>
                    <img className="expense-picture" src={expenseInfo.expensePic} alt="" />
                </div>
            }
        </div>
    )

}
export default ExpenseCard;