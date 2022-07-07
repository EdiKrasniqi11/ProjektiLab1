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
        <div className={stylist.smisDiv}>
            <div id={stylist.sidebar}>
                <NavLink to="/staff/profesoret"><button>PROFESORET</button></NavLink><br />
                <NavLink to="/staff/administratoret"><button>ADMINISTRATORET</button></NavLink><br />
                <NavLink to="/staff/studentet"><button autoFocus>STUDENTET</button></NavLink>
                <NavLink to="/staff/waitlist"><button autoFocus>WAITLIST</button></NavLink>
            </div>
            <Outlet />
        </div>
    )
}