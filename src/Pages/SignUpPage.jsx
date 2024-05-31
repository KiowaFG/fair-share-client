import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";
import nameIcon from "../assets/images/username-icon.png";
import surnameIcon from "../assets/images/surname-icon.png";
import dateOfBirthIcon from "../assets/images/date-icon.png";
import PhoneNumber from "../assets/images/phone-icon.svg";
import emailIcon from "../assets/images/email-icon.svg";
import paswordIcon from "../assets/images/password-icon.svg";
import passwordConfirmIcon from "../assets/images/password-confirm.svg";

const API_URL = "http://localhost:5005";

function SignUpPage(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleDateOfBirth = (e) => setDateOfBirth(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword){
      setErrorMessage("Passwords need to coincide");
      return
    };

    // name, lastName, dateOfBirth, phoneNumber, email, password
    const requestBody = {
      name,
      lastName,
      dateOfBirth,
      phoneNumber,
      email,
      password
    };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        // navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  //....ojo....///

  return (
    <div className="sign-container">
      <div className="signup-container">
        <div className="headerSP">
          <div className="text-signup">Sing Up</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSignUpSubmit}>
          <div className="inputs">
            <div className="input">
              <img src={nameIcon} alt="" />
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                placeholder="Name"
              />
            </div>
            <div className="input">
              <img src={surnameIcon} alt="" />
              <input
                type="text"
                name="lastname"
                value={lastName}
                onChange={handleLastName}
                placeholder="Last name"
              />
            </div>
            <div className="input">
              <img src={dateOfBirthIcon} alt="" />
              <input
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={handleDateOfBirth}
                placeholder="Date Of Birth"
              />
            </div>
            <div className="input">
              <img src={PhoneNumber} alt="" />
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                placeholder="Phone Number"
              />
            </div>
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
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
              />
            </div>
            <div className="input">
              <img src={passwordConfirmIcon} alt="" />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="btn-submit-container">
           <button className="btn-submit">Sign Up</button>
            
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="haveaccount">
          Already have <strong>account</strong>?
        </p>
        <Link to={"/login"} className="loglink">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
