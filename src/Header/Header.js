import "./Header.css";
import image from "../Images/UniversityLogo.jpg";

function Header() {
  return (
    <div className="headerDiv">
      <div id="navBar">
        <img src={image} id="universityLogo" />
        <ul id="navList">
          <li>Lajmet</li>
          <li>Galeria</li>
          <li>Drejtimet</li>
          <li>Njoftimet për Studentë</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
