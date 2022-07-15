import React from 'react'
import stylist from './University.module.css'
import secureLocalStorage from 'react-secure-storage';

import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
    Outlet
  } from "react-router-dom";

export default function University(){
    return (
        <div>
            {secureLocalStorage.getItem('role')=='admin'?
            <div className={stylist.locationsDiv}>
                <div id={stylist.sidebar}>
                    <NavLink to="/university/shtetet"><button autoFocus>SHTETET</button></NavLink><br />
                    <NavLink to="/university/fakultetet"><button>FAKULTETET</button></NavLink><br />
                </div>
                <Outlet id={stylist.outlet}/>
            </div>
            :
            <div className={stylist.locationsDiv}>
                OPPS THE URL YOU HAVE ENTERED IS AUTHORIZED TO ADVANCED PERSONNEL ONLY PLEASE RETURN TO THE HOME PAGE AND LOGIN WITH ACCURATE CREDENTIALS
            </div>}
        </div>
    )
}