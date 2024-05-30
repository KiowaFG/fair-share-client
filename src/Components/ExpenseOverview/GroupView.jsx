import { Link } from "react-router-dom"
import "./GroupView.css"

function GroupView(){
    return (
        <Link to={"/details"}>
            <div className="group-overview">
                <img className="group-viewImg" src="https://images.delunoalotroconfin.com/Content/images/000/Productos/Prod_2828_1.jpg" alt="" />
                <div className="group-info">
                    <h3>Nepal Trip</h3>
                    <div className="group-details">
                        <div className="center-info">
                            <h5>Total expense:</h5>
                            <p>800€</p>
                        </div>
                        <div className="center-info">
                            <h5>Personal Balance:</h5>
                            <p>-300€</p>
                        </div>
                    </div>
                </div>



            </div>
            </Link>
    )
}
export default GroupView