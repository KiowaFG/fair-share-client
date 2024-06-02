import { Link } from "react-router-dom"
import "./GroupView.css"
import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { AuthContext } from "../../context/auth.context"

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
            .then((response) => setGroups(response.data))//setGroups(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        user && getAllGroups();
    }, [user]);

    return (
        <>
            {groups.map((group) => {
                return (
                    <Link key={group._id} to={`/details/${group._id}`}>
                        <div className="group-overview">
                            <img className="group-viewImg" src="https://images.delunoalotroconfin.com/Content/images/000/Productos/Prod_2828_1.jpg" alt="" />
                            <div className="group-info">
                                <h3>{group.name}</h3>
                                <div className="group-details">
                                    <div className="center-info">

                                        <h5>Total expense:</h5>
                                        <p>800€</p>
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