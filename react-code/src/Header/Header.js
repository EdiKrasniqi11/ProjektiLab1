import HeaderCSS from "./Header.module.css";
import image from "../Images/UniversityLogo.jpg";

function Header() {
  return (
    <div className="headerDiv">
      <div id={HeaderCSS.navBar}>
        <img src={image} id={HeaderCSS.universityLogo} />
        <ul id={HeaderCSS.navList}>
          <li>LAJMET</li>
          <li>GALERIA</li>
          <li>DREJTIMET</li>
          <li>NJOFTIMET</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
