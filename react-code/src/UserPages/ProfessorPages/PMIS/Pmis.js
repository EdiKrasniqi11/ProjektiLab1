import React from 'react'
import stylist from './Pmis.module.css'


import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
    Outlet
  } from "react-router-dom";

export default function PMIS(){
    return (
        <div>
            {localStorage.getItem('role')=='professor'?
            <div className={stylist.pmisDiv}>
                <div id={stylist.sidebar}>
                    <NavLink to="/pmis/vleresimet"><button autoFocus>VLERESIMET</button></NavLink><br />
                    <NavLink to="/pmis/shkembimet"><button>SHKEMBIMET</button></NavLink>
                </div>
                <Outlet />
            </div>
            :
            <div className={stylist.smisDiv}>
                OPPS THE URL YOU HAVE ENTERED IS AUTHORIZED TO PROFESSOR PERSONNEL ONLY PLEASE RETURN TO THE HOME PAGE AND LOGIN WITH ACCURATE CREDENTIALS
            </div>}
        </div>
    )
}