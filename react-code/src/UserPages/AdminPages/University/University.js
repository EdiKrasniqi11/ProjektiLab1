import React from 'react'
import stylist from './University.module.css'


import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
    Outlet
  } from "react-router-dom";

export default function University(){
    return (
        <div className={stylist.locationsDiv}>
            <div id={stylist.sidebar}>
                <NavLink to="/university/shtetet"><button autoFocus>SHTETET</button></NavLink><br />
                <NavLink to="/university/fakultetet"><button>FAKULTETET</button></NavLink><br />
            </div>
            <Outlet />
        </div>
    )
}