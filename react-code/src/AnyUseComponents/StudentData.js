import React from 'react'
import stylist from './StudentDataStyle.module.css'

function StudentData(props){
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
                            <p>Fakulteti: </p>
                            <p>Dega: </p>
                            <p>Drejtimi: </p>
                            <p>Specializimi: </p>
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

export default StudentData