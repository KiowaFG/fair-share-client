import "../App.css";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import travelIcon from "../assets/images/icon-travel.png";
import shareIcon from "../assets/images/icon-share.png";
import moneyIcon from "../assets/images/icon-money.png";
import bananasplit from "../assets/images/bananasplit.jpg";

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-container2">
        <p className="slogan"> <strong>Fair share,</strong> Split Wisely</p>
        <p className="slogansito"> "Easy Bills  <strong>easy life"</strong></p>
      <div className="landingBtns">
        <Link to="/signup">
          <button className="btn">SignUp</button>{" "}
        </Link>
        <Link to="/login">
          <button className="btn">LogIn</button>
        </Link>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
