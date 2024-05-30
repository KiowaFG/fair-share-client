import "./Footer.css";

function Footer() {
    const newDate= new Date;
    return(

        <Footer>
            <div>
                <p> ©️{newDate.getFullYear()} Developed by Alvaro, Kaiowa and Nisol.</p>
            </div>
        </Footer>
    )
}

export default Footer;