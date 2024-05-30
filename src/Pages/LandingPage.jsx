import "../App.css";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import travelIcon from "../assets/images/icon-travel.png";
import shareIcon from "../assets/images/icon-share.png";
import moneyIcon from "../assets/images/icon-money.png";
import bananasplit from "../assets/images/bananasplit.jpg";

function LandingPage() {
  return (
    <>
      <div className="landing-container">
       

        <p className="slogan">
          Fair share, <strong>fair</strong> travel
        </p>
        <p className="slogansito">
          "Expense <strong>equality </strong>for your journeys"
        </p>
        <div className="icons-LandingPage">
          <img src={travelIcon} alt=" travelIcon" />
          <img src={shareIcon} alt=" shareIcon" />
          <img src={moneyIcon} alt=" moneyIcon" />
        </div>

        <div className="img-bnncontainer">
          <img className="banana" src={bananasplit} alt="" />
        </div>
        <Link to="/SignUpPage">
          <button className="btn">SignUp</button>
        </Link>
        <Link to="">
          <button className="btn">LogIn</button>
        </Link>
      </div>
    </>
  );
}
export default LandingPage;
