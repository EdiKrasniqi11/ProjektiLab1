import React from 'react'
import stylist from './Smis.module.css'
import MyTranscript from '../MyTranscript/MyTranscript';
import ParaqitProvimet from '../ParaqitProvimet/ParaqitProvimet';


import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
    Outlet
  } from "react-router-dom";

function SMIS(){
    return (
        <div className={stylist.smisDiv}>
            <div id={stylist.sidebar}>
                <NavLink to="/smis/transkripta"><button autoFocus>TRANSKRIPTA</button></NavLink><br />
                <NavLink to="/smis/paraqit-provimet"><button>PARAQIT PROVIMET</button></NavLink><br />
                <NavLink to="/smis/my-schedule"><button>CAKTO TERMININ</button></NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default SMIS