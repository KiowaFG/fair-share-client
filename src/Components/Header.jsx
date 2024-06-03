import "./Header.css"
import burger from "../assets/hamburger.png"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import closeIcon from "../assets/X.png"

function Header({ showSidebar }) {

    const { user, setUser, logOut, avatarPic } = useContext(AuthContext);
    const [profileMenu, setProfileMenu] = useState(false);
    
    const navigate = useNavigate();

    const profilImageMenu = () => {
        return (
            <div className="profile-menu">
                <ul>
                    <li onClick={() => {
                        navigate("/user")
                        setProfileMenu(false);
                    }
                    }>User Profile</li>
                    <li onClick={() => {
                        setProfileMenu(false);
                        setUser(null);
                        logOut();
                    }
                    }>Logout</li>
                </ul>
            </div>
        )
    }

    return (
        <nav className="header">

                <img onClick={()=>handleHideSidebar()} className="burger" src={showSidebar ? closeIcon  : burger} alt="" />
                <Link to={"/home"}>
                <img className="logo" src="https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.34264412.1711411200&semt=ais" alt="" />
            </Link>
            <div className="profile-wrapper">
                <div className="profile" onClick={() => setProfileMenu(!profileMenu)} >
                    <img src={avatarPic}  alt="" />
                    <p>{user && user.name}</p>
                </div>
                {profileMenu && profilImageMenu()}
            </div>

        </nav>
    )
}
export default Header