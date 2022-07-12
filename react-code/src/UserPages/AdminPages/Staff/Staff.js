import React from 'react'
import stylist from './Staff.module.css'


import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
    Outlet
  } from "react-router-dom";

export default function Staff(){
    return (
        <div>
            {localStorage.getItem('role')=='admin'?
            <div className={stylist.staffDiv}>
                <div id={stylist.sidebar}>
                    <NavLink to="/staff/profesoret"><button autoFocus>PROFESORET</button></NavLink><br />
                    <NavLink to="/staff/administratoret"><button>ADMINISTRATORET</button></NavLink><br />
                    <NavLink to="/staff/studentet"><button>STUDENTET</button></NavLink>
                    <NavLink to="/staff/waitlist"><button>WAITLIST</button></NavLink>
                </div>
                <Outlet />
            </div>
            :
            <div className={stylist.staffDiv}>
                OPPS THE URL YOU HAVE ENTERED IS AUTHORIZED TO ADVANCED PERSONNEL ONLY PLEASE RETURN TO THE HOME PAGE AND LOGIN WITH ACCURATE CREDENTIALS
            </div>}
        </div>
    )
}