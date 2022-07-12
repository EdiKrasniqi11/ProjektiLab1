import React from 'react'
import stylist from './ModalStyle.module.css'

function Modal(props){
    return(
        <div className={stylist.modalDiv}>
            <div className={stylist.formWindow}>
                <header className={stylist.modalHeader}>
                    <button id={stylist.exitButton} onClick={props.modalSwitch}>x</button>
                </header>
                <div className={stylist.formDiv}>
                {props.children}
                </div>
            </div>
        </div>
        )
}

export default Modal;