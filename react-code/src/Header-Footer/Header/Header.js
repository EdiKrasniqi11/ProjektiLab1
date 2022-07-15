import React from 'react';
import image from "../../Images/UniversityLogo.jpg";
import HeaderCSS from "./Header.module.css";
import {NavLink} from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

function Header() {
  return (
    <div id={HeaderCSS.navBar}>
      <img src={image} id={HeaderCSS.universityLogo} />
      <ul id={HeaderCSS.navList}>
        <li><NavLink to="/">HOME</NavLink></li>
        <li><NavLink to="/lajmet">LAJMET</NavLink></li>
        {secureLocalStorage.getItem('role')!=null?<li><NavLink to="/njoftimet">NJOFTIMET</NavLink></li>:null}
        <li><NavLink to="/galeria">GALERIA</NavLink></li>
        {secureLocalStorage.getItem("role")=="student"?<li><NavLink to="/smis/transkripta">SMIS</NavLink></li>:null}
        {secureLocalStorage.getItem("role")=="admin"?<li><NavLink to="/staff/profesoret">STAFF</NavLink></li>:null}
        {secureLocalStorage.getItem("role")=="professor"?<li><NavLink to="/pmis/vleresimet">PMIS</NavLink></li>:null}
        {secureLocalStorage.getItem("role")=="admin"?<li><NavLink to="/university/shtetet">UNIVERISTY</NavLink></li>:null}
        {secureLocalStorage.getItem("user")==null?<li><NavLink to ="/login">LOGIN</NavLink></li>:
        <li id={HeaderCSS.logoutButton} onClick={() => {secureLocalStorage.clear(); window.location.href = '../'}}>LOG OUT</li>}
      </ul>
    </div>
  );
}

export default Header;