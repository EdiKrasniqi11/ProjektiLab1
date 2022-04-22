import React from 'react';
import image from "../src/Images/UniversityLogo.jpg";
import HeaderCSS from "../src/Header/Header.module.css";
import Shtetet from "../src/Shtetet/Shtetet";
import Lajmet from "../src/Lajmet/Lajmet";
import Home from "../src/Home/Home";
import Njoftimet from "../src/Njoftimet/Njoftimet";
import {BrowserRouter as Router, Route, NavLink,Routes} from 'react-router-dom';

function App(){
  return (
    <Router>
    <div className="headerDiv">
      <div id={HeaderCSS.navBar}>
        <img src={image} id={HeaderCSS.universityLogo} />
        <ul id={HeaderCSS.navList}>
          <li >
            <NavLink to="/home">HOME</NavLink></li>
          <li>
            <NavLink to="/lajmet">LAJMET</NavLink></li>
          <li>
            <NavLink to="/njoftimet">NJOFTIMET</NavLink></li>
          <li>
            <NavLink to="/shtetet">SHTETET</NavLink></li>
        </ul>
      </div>
  <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/lajmet' element={<Lajmet/>}/>
        <Route path='/njoftimet' element={<Njoftimet/>}/>
        <Route path='/shtetet' element={<Shtetet/>}/>
    </Routes>
    </div>
     </Router>
  );
}


export default App;
