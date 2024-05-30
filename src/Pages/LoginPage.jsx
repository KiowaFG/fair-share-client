import { useState, useContext } from "react";
import "./LoginPage.css";
/* import axios from "axios"; */
import { Link, useNavigate } from "react-router-dom";
/* import { AuthContext } from "../context/auth.context"; */
import emailIcon from "../assets/images/email-icon.svg";
import paswordIcon from "../assets/images/password-icon.svg";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  /*  const { storeToken, authenticateUser } = useContext(AuthContext);  */
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    /*  axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);

        authenticateUser();
        navigate("/");
      })

      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });  */
  };

  return (
    <div className="login-container">
      <div className="signup-container">
        <div className="headerSP">
          <div className="text-signup">Login</div>
          <div className="underline"></div>
        </div>

        <form onSubmit={handleLoginSubmit}>
          <div className="input">
            <img src={emailIcon} alt="" />
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
            />
          </div>

          <div className="input">
            <img src={paswordIcon} alt="" />
            <input
              type="text"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />
          </div>
          <div className="btn-submit-container">
            <Link to={"/home"}>
              <button className="btn-submit">Login</button>
            </Link>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="haveaccount">
          Don't have an <strong>account yet</strong>?
        </p>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
