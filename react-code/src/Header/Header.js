import React from 'react';
import image from "../Images/UniversityLogo.jpg";
import HeaderCSS from "./Header.module.css";
import {NavLink} from 'react-router-dom';

function Header() {
  return (
    <div id={HeaderCSS.navBar}>
      <img src={image} id={HeaderCSS.universityLogo} />
      <ul id={HeaderCSS.navList}>
        <li><NavLink to="/lajmet">LAJMET</NavLink></li>
        <li><NavLink to="/njoftimet">NJOFTIMET</NavLink></li>
        <li><NavLink to="/shtetet">SHTETET</NavLink></li>
        <li><NavLink to="/qytetet">QYTETET</NavLink></li>
        <li><NavLink to="/fakultetet">FAKULTETET</NavLink></li>
        <li><NavLink to="/deget">DEGET</NavLink></li>
        <li><NavLink to="/drejtimet">DREJTIMET</NavLink></li>
        <li><NavLink to="/vendbanimet">VENDBANIMET</NavLink></li>
        <li><NavLink to="/specializimet">SPECIALIZIMET</NavLink></li>
        <li><NavLink to="/studentet">STUDENTET</NavLink></li>
      </ul>
    </div>
  );
}

export default Header;