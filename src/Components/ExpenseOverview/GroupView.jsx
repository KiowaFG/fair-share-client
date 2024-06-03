import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import "./GroupView.css";

const API_URL = import.meta.env.VITE_API_URL

function GroupView() {
    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);

    const getAllGroups = () => {
        axios
            .get(
                `${API_URL}/groups/${user._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then((response) => { setGroups(response.data) })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        user && getAllGroups();
    }, [user]);

    return (
        <>
            {groups.map((group) => {
                const paid = Math.round(group.groupExpenses.reduce((acc, curr) => curr.expenseAuthor === user._id ? acc + curr.amount : acc + 0, 0));
                const borrowed = Math.round(group.groupExpenses.reduce((acc, curr) => curr.expenseAuthor !== user._id ? acc + Math.round(curr.amount/curr.expenseUsers.length) : acc + 0, 0));
                const balance = paid - borrowed;

                return (
                    <Link key={group._id} to={`/details/${group._id}`}>
                        <div className="group-overview">
                            <img className="group-viewImg" src={group.groupPic} alt="" />
                            <div className="group-info">
                                <h3>{group.name}</h3>
                                <div className="group-details">
                                    <div className="center-info">
                                        <h5>Trip Balance:</h5>
                                        <p>{`${balance} €`}</p>
                                    </div>
                                    <div className="center-info">
                                        <h5>Paid:</h5>
                                        <p>{`${paid} €`}</p>
                                    </div>
                                    <div className="center-info">
                                        <h5>Borrowed:</h5>
                                        <p>{`${borrowed} €`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}
export default GroupView