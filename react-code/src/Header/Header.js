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
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/lajmet">LAJMET</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/njoftimet">NJOFTIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/deget">DEGET</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/drejtimet">DREJTIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/specializimet">SPECIALIZIMET</NavLink></li>:null}
        <li><NavLink to="/galeria">GALERIA</NavLink></li>
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/lendet">LENDET</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/shkembimet">SHKEMBIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/vleresimet">VLERESIMET</NavLink></li>:null}
        {localStorage.getItem("role")=="student"?<li><NavLink to="/smis/transkripta">SMIS</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/staff/profesoret">STAFF</NavLink></li>:null}
        {localStorage.getItem("role")=="admin"?<li><NavLink to="/university/shtetet">UNIVERISTY</NavLink></li>:null}
        {localStorage.getItem("user")==null?<li><NavLink to ="/login">LOGIN</NavLink></li>:
        <li id={HeaderCSS.logoutButton} onClick={() => {localStorage.removeItem("user"); localStorage.removeItem("role"); window.location.href = '../'}}>LOG OUT</li>}
      </ul>
    </div>
  );
}

export default Header;