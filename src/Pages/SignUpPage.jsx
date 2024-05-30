import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";
import nameIcon from "../assets/images/username-icon.png";
import surnameIcon from "../assets/images/surname-icon.png";
import dateOfBirth from "../assets/images/date-icon.png";
import PhoneNumber from "../assets/images/phone-icon.svg";
import emailIcon from "../assets/images/email-icon.svg";
import paswordIcon from "../assets/images/password-icon.svg";
import passwordConfirmIcon from "../assets/images/password-confirm.svg";

const API_URL = "http://localhost:5005";

function SignUpPage(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleDateOfBirth = (e) => setDateOfBirth(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      surname,
      dateOfBirth,
      PhoneNumber,
      email,
      password,
      confirmPassword,
    };

    axios
      .post(`${API_URL}/auth/sigup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  //....ojo....///

  return (
    <div className="signup-container">
      <div className="headerSP">
        <div className="text-signup">Sing Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSignUpSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={nameIcon} alt="" />
            <input type="text" name="name" value={name} onChange={handleName} placeholder="Name" />
          </div>
          <div className="input">
            <img src={surnameIcon} alt="" />
            <input type="text" name="surname" value={surname} onChange={handleSurname} placeholder="Surname" />
          </div>
          <div className="input">
            <img src={dateOfBirth} alt="" />
            <input type="text" name="dateOfBirth" value={dateOfBirth} onChange={handleDateOfBirth} placeholder="Date Of Birth" />
          </div>
          <div className="input">
            <img src={PhoneNumber} alt="" />
            <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumber} placeholder="Phone Number" />
          </div>
          <div className="input">
            <img src={emailIcon} alt="" />
            <input type="text" name="email" value={email} onChange={handleEmail} placeholder="Email" />

          </div>
          <div className="input">
            <img src={paswordIcon} alt="" />
            <input type="text" name="password" value={password} onChange={handlePassword} placeholder="Password" />
          </div>
          <div className="input">
            <img src={passwordConfirmIcon} alt="" />
            <input type="text" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} placeholder="Confirm Password" />
          </div>
        </div>
        <div className="btn-submit-container">
          <button className="btn-submit">Sign Up</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/LoginPage"}>Login</Link>
    </div>
  );
}

export default SignUpPage;
