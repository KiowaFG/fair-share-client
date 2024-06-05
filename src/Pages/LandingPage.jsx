import "../App.css";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import travelIcon from "../assets/images/icon-travel.png";
import shareIcon from "../assets/images/icon-share.png";
import androidIcon from "../assets/androidIcon.png";
import macIcon from "../assets/macIcon.png";
import owl from "../assets/owl.png"
import decoImg from "../assets/landingPageImg.jpeg"

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-container2">
        <div className="logoText">
          <div className="landingText">
            <p className="slogan"> <strong>Fair Share,</strong>  Split Wisely</p>
            <p className="slogansito"> "Easy Bills  <strong>easy life"</strong></p>
            <div className="landingExtras">
              <p>Keep track of expenses and balances shared with roommates, travelers, groups, friends and family.</p>
              <p className="platformDevice">Free for <img className="device" src={macIcon} alt="" /> Iphone & <img className="device" src={androidIcon} alt="" /> Android </p>
            </div>
          </div>
          <img className="backgroundImg" src={owl} alt="" />

        </div>
        <div>
          <div className="landingBtns">
            <Link to="/signup">
              <button className="btn">SignUp</button>{" "}
            </Link>
            <Link to="/login">
              <button className="btn">LogIn</button>
            </Link>
          </div>
          <img className="landingImageDeco" src={decoImg} alt="" />
        </div>


      </div>
    </div>
  )
}
export default LandingPage;
