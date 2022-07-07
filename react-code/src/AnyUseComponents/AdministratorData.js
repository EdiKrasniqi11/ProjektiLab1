import React from 'react'
import stylist from './StudentDataStyle.module.css'

export default function AdministratorData(props){
    return(
        <div className={stylist.modalDiv}>
            <div className={stylist.formWindow}>
                <header className={stylist.modalHeader}>
                    <button id={stylist.exitButton} onClick={props.modalSwitch}>x</button>
                </header>
                <div>
                    <h2>Student Data</h2>
                    <div className={stylist.dataDiv}>
                        <div id={stylist.titles}>
                            <p>Student ID: </p>
                            <p>Emri: </p>
                            <p>Email: </p>
                            <p>Password: </p>
                            <p>Datelindja: </p>
                            <p>Gjinia: </p>
                            <p>Venbanimi: </p>
                        </div>
                        <div id={stylist.studentData}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}