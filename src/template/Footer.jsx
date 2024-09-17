import FooterBulb from "../assets/footerAssets/FooterBulb.svg";
import FooterHome from "../assets/footerAssets/FooterHome.svg";
import FooterSettings from "../assets/footerAssets/FooterSettings.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer
        className="bg-White
      h-16 "
      >
        <nav className="flex h-16  justify-around items-center">
          <img src={FooterBulb} alt="Light" />{" "}
          <Link to="/">
            <img src={FooterHome} alt="Home" />
          </Link>
          <img src={FooterSettings} alt="Settings" />
        </nav>
      </footer>
    </>
  );
};

export default Footer;
