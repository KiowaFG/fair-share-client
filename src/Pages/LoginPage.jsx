import { useState, useContext } from "react";
import "./LoginPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import emailIcon from "../assets/images/email-icon.svg";
import paswordIcon from "../assets/images/password-icon.svg";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const navigate = useNavigate();

  const { storeToken, authenticateUser, setAvatarPic } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        
        authenticateUser();
      })

      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    
    <div className="login-container">
      <div className="log-container">
        <div className="header-lg">
          <div className="lg-text-signup">Login</div>
          <div className="lg-underline"></div>
        </div>

        <form className="lg-form" onSubmit={handleLoginSubmit}>
          <div className="lg-input">
            <img src={emailIcon} alt="" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
            />
          </div>

          <div className="lg-input">
            <img src={paswordIcon} alt="" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />
          </div>
          <div className="lg-btn-submit-container">
            <button className="lg-btn-submit">Login</button>
          </div>
        </form>
        {errorMessage && <p className="lg-error-message">{errorMessage}</p>}

        <p className="lg-haveaccount">
          Don't have an <strong>account yet</strong>?
        </p>
        <Link to={"/signup"} className="lg-link-signup"> Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
