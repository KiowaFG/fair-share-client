import "./Header.css"
import burger from "../assets/hamburger.png"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import closeIcon from "../assets/X.png"

function Header({ setShowSidebar, showSidebar }) {

    const { user, setUser, logOut } = useContext(AuthContext);
    const [profileMenu, setProfileMenu] = useState(false);

    const profilImageMenu = () => {
        return (
            <div className="profile-menu">
                <ul>
                    <li>User Profile</li>
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

            <img onClick={() => setShowSidebar(true)} className="burger" src={showSidebar ? closeIcon : burger} alt="" />
            <Link to={"/home"}>
                <img className="logo" src="https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.34264412.1711411200&semt=ais" alt="" />
            </Link>
            <div className="profile-wrapper">
                <div className="profile" onClick={() => setProfileMenu(!profileMenu)} >
                    <img src="https://www.shutterstock.com/image-vector/vector-illustration-orange-octopus-sea-600nw-2147414107.jpg" alt="" />
                    <p>{user && user.name}</p>
                </div>
                {profileMenu && profilImageMenu()}
            </div>

        </nav>
    )
}
export default Header