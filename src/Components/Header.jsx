import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import closeIcon from "../assets/X.png"
import Logo from "../assets/owl.png"
import burger from "../assets/hamburger.png"
import "./Header.css"


function Header({ showSidebar, handleHideSidebar }) {

    const { user, avatarPic } = useContext(AuthContext);
    const [profileMenu, setProfileMenu] = useState(false);

    return (
        <nav className="header">
            <div className="header-separator-left">
                <img onClick={() => handleHideSidebar()} className="burger" src={showSidebar ? closeIcon : burger} alt="" />
            </div>
            <div className="header-separator-center">
                <Link to={"/home"}>
                    <img className="logo" src={Logo} alt="" />
                </Link>
            </div>
            <div className="header-separator-right">
                <Link to={"/user"}>
                    <div className="profile-wrapper">
                        <div className="profile" onClick={() => setProfileMenu(!profileMenu)} >
                            <div className="profile-background">
                                <img src={avatarPic} alt="" />
                            </div>
                            <p className="header-email">{user && user.email}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </nav>
    )
}
export default Header