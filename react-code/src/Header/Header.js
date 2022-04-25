import React from 'react';
import image from "../Images/UniversityLogo.jpg";
import HeaderCSS from "./Header.module.css";
import {NavLink} from 'react-router-dom';

function Header() {
  return (
    <div id={HeaderCSS.navBar}>
      <img src={image} id={HeaderCSS.universityLogo} />
      <ul id={HeaderCSS.navList}>
        <li><NavLink to="/home">HOME</NavLink></li>
        <li><NavLink to="/lajmet">LAJMET</NavLink></li>
        <li><NavLink to="/njoftimet">NJOFTIMET</NavLink></li>
        <li><NavLink to="/shtetet">SHTETET</NavLink></li>
      </ul>
    </div>
  );
}

export default Header;