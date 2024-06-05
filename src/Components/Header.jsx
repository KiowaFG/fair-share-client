import "./Header.css"
import burger from "../assets/hamburger.png"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import closeIcon from "../assets/X.png"
import Logo from "../assets/Logo.png"

function Header({ showSidebar, handleHideSidebar }) {

    const { user, avatarPic } = useContext(AuthContext);
    const [profileMenu, setProfileMenu] = useState(false);

    return (
        <nav className="header">

            <img onClick={() => handleHideSidebar()} className="burger" src={showSidebar ? closeIcon : burger} alt="" />
            <Link to={"/home"}>
                <img className="logo" src={Logo} alt="" />
            </Link>
            <Link to={"/user"}>
                <div className="profile-wrapper">
                    <div className="profile" onClick={() => setProfileMenu(!profileMenu)} >
                        <img src={avatarPic} alt="" />
                        <p>{user && user.name}</p>
                    </div>
                </div>
            </Link>
        </nav>
    )
}
export default Header