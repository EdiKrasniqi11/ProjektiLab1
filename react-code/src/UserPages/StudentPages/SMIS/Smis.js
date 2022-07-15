import React from 'react'
import stylist from './Smis.module.css'
import secureLocalStorage from 'react-secure-storage';

import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
    Outlet
  } from "react-router-dom";

function SMIS(){
    return (
        <div>
            {secureLocalStorage.getItem('role')=='student'?
            <div className={stylist.smisDiv}>
                <div id={stylist.sidebar}>
                    <NavLink to="/smis/transkripta"><button autoFocus>TRANSKRIPTA</button></NavLink><br />
                    <NavLink to="/smis/paraqit-provimet"><button>PARAQIT PROVIMET</button></NavLink><br />
                    <NavLink to="/smis/my-schedule"><button>CAKTO TERMININ</button></NavLink>
                </div>
                <Outlet />
            </div>
            :
            <div className={stylist.smisDiv}>
                OPPS THE URL YOU HAVE ENTERED IS AUTHORIZED TO STUDENT PERSONNEL ONLY PLEASE RETURN TO THE HOME PAGE AND LOGIN WITH ACCURATE CREDENTIALS
            </div>}
        </div>
    )
}

export default SMIS