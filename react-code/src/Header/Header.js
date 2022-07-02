import React from 'react';
import image from "../Images/UniversityLogo.jpg";
import HeaderCSS from "./Header.module.css";
import {NavLink} from 'react-router-dom';

function Header() {
  return (
    <div id={HeaderCSS.navBar}>
      <img src={image} id={HeaderCSS.universityLogo} />
      <ul id={HeaderCSS.navList}>
        <li><NavLink to="/">HOME</NavLink></li>
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/lajmet">LAJMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/njoftimet">NJOFTIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/shtetet">SHTETET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/qytetet">QYTETET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/fakultetet">FAKULTETET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/deget">DEGET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/drejtimet">DREJTIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/vendbanimet">VENDBANIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/specializimet">SPECIALIZIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/studentet">STUDENTET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/galerite">GALERIA</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/profesoret">PROFESORET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/lendet">LENDET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/provimet">PROVIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/waitlist">WAITLIST</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/shkembimet">SHKEMBIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/vleresimet">VLERESIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="professor"?<li><NavLink to="/terminet">TERMINET</NavLink></li>:null}
        {localStorage.getItem("user")==""?<li><NavLink to ="/login">LOGIN</NavLink></li>:
        <li id={HeaderCSS.logoutButton} onClick={() => {localStorage.setItem("user",""); localStorage.setItem("role",""); window.location.href = '../'}}>LOG OUT</li>}
      </ul>
    </div>
  );
}

export default Header;