import instagramLogo from "../assets/images/instagram.png";
import facebookLogo from "../assets/images/facebook.png";
import linkedinLogo from "../assets/images/linkedin.png";
import youtubeLogo from "../assets/images/youtube.png";
import xLogo from "../assets/images/x.png";
import "./Footer.css";

const date = new Date();

function Footer() {
  return (
    <div className="footer-container">
      <div className="footerLeft-container">
        <p className="footer-paragraph">
          © {date.getFullYear()}
        </p>
        <p className="footer-paragraph">
          Fair Share
        </p>
      </div>
      <div className="footerMid-container">
        <a href="https://www.instagram.com/" target="__blank">
          <img
            className="footer-logo instagram"
            src={instagramLogo}
            alt="instagram logo"
          />
        </a>
        <p className="logo-separator">/</p>
        <a href="https://www.facebook.com/" target="__blank">
          <img
            className="footer-logo facebook"
            src={facebookLogo}
            alt="facebook logo"
          />
        </a>
        <p className="logo-separator">/</p>
        <a href="https://www.linkedin.com/" target="__blank">
          <img
            className="footer-logo linkedin"
            src={linkedinLogo}
            alt="linkedin logo"
          />
        </a>
        <p className="logo-separator">/</p>
        <a href="https://www.youtube.com/" target="__blank">
          <img
            className="footer-logo youtube"
            src={youtubeLogo}
            alt="youtube logo"
          />
        </a>
        <p className="logo-separator">/</p>
        <a href="https://twitter.com/" target="__blank">
          <img className="footer-logo xlogo" src={xLogo} alt="x logo" />
        </a>

      </div>
      <div className="footerRight-container">
        <p className="footer-paragraph left">About Us</p>
      </div>
    </div >
  );
}

export default Footer;
