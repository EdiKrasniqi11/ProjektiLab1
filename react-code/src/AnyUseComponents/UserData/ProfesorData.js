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
                    <h2>Professor Data</h2>
                    <div className={stylist.dataDiv}>
                        <div id={stylist.titles}>
                            <p>ProfesorID: </p>
                            <p>Emri: </p>
                            <p>Grada: </p>
                            <p>Numri: </p> 
                            <p>Email: </p>
                            <p>Password: </p>
                            <p>Datelindja: </p>
                            <p>Gjinia: </p>
                            <p>Venbanimi: </p>
                            <p>Drejtimi: </p>
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