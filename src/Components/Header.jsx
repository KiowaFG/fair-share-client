import "./Header.css"
import burger from "../assets/hamburger.png"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function Header({setShowSidebar}){

    const {userName} = useContext(AuthContext);

    return (
        <nav className="header">
            
                <img onClick={()=>setShowSidebar(true)} className="burger" src={burger} alt="" />
                <Link to={"/home"}>
                <img className="logo" src="https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.34264412.1711411200&semt=ais" alt="" />
                </Link>
                <div className="profile">
                <img src="https://www.shutterstock.com/image-vector/vector-illustration-orange-octopus-sea-600nw-2147414107.jpg" alt="" />
                <p>{userName}</p>
                </div>
        </nav>
    )
}
export default Header