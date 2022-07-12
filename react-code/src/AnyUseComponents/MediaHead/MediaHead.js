import React from 'react'
import stylist from './MediaHead.module.css'

export default function MediaHead(props){
    return(
        <div id={stylist.pageHead}>
            <div id={stylist.titleDiv}>
                <h1>{props.title}</h1>
            </div>
            {localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'professor'?
            <div id={stylist.buttonDiv}>
                    <button type="button" onClick={props.addClick} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
            </div>:null}
        </div>
        )
}