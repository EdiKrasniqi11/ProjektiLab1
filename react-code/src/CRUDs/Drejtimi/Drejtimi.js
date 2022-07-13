import React, { Component } from "react";
import stylist from "./Drejtimi.module.css";
import variables from "../Variables";
import Modal from '../../AnyUseComponents/Modal/Modal'
import {NavLink} from "react-router-dom"

export class Drejtimi extends Component{
    constructor(props){
        super(props);
        let URLcomponents = window.location.href.split('/');
        this.state = {
            drejtimet:[],
            fakultetet:[],
            Emri:"",
            Fakulteti:URLcomponents[5],
            DrejtimiID:0,
            insertModal:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'drejtimi').then(response=>response.json())
        .then(data=>{this.setState({drejtimet:data});});

        fetch(variables.API_URL+'fakulteti').then(response=>response.json())
        .then(data=>{this.setState({fakultetet:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmri = (e) =>{
        this.setState({Emri:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'drejtimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:this.state.Emri,
                Fakulteti:this.state.Fakulteti
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');  
        })
        this.setState({insertModal:false})
    }
    
    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'drejtimi/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }
    updateClick(){
        fetch(variables.API_URL+'drejtimi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DrejtimiID:this.state.DrejtimiID,
                Emri:this.state.Emri,
                Fakulteti:this.state.Fakulteti
            })
        }).then(res=>res.json())
        .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
        })
        this.setState({insertModal: false})
    }
    addClick() {
        this.setState({
          DrejtimiID: 0,
          Emri: "",
          insertModal:true
        });
    }
    getURL(drejtimi){
        return "/university/specializimet/"+drejtimi.Fakulteti+"/"+drejtimi.DrejtimiID
    }
    getURL2(drejtimi){
        return "/university/lendet/"+drejtimi.Fakulteti+"/"+drejtimi.DrejtimiID
    }
    editClick(drejtimet){
        this.setState({
            DrejtimiID:drejtimet.DrejtimiID,
            Emri:drejtimet.Emri,
            Fakulteti:drejtimet.Fakulteti,
            insertModal:true
        });
    }
    selectFakulteti(fakultetet, id){
        for(let i=0;i<fakultetet.length;i++){
            if(fakultetet[i].FakultetiID === id){
                return fakultetet[i].Emri;
            }
        }
    }
    render(){
        const{
            drejtimet,
            fakultetet,
            DrejtimiID,
            Emri,
            Fakulteti,
            insertModal
        }=this.state;
        return(
            <div className={stylist.drejtimiDiv}>
                <div id={stylist.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
                </div>
                <table>
                    <tr>
                        <th>DrejtimiID</th>
                        <th>Emri</th>
                        <th>Fakulteti</th>
                        <th>Options</th>
                    </tr>
                    {drejtimet.filter(drejtimi=> drejtimi.Fakulteti == Fakulteti).map(drejtimet=>
                    <tr key={drejtimet.DrejtimiID}>
                        <td>{drejtimet.DrejtimiID}</td>
                        <td>{drejtimet.Emri}</td>
                        <td>{this.selectFakulteti(fakultetet, drejtimet.Fakulteti)}</td>
                        <td>
                            <NavLink to={this.getURL(drejtimet)}><button type="button" title="Specializimet"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg></button></NavLink>
                            <NavLink to={this.getURL2(drejtimet)}><button type="button" title="Lendet"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16"><path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/></svg></button></NavLink>
                            <button type="button" onClick={()=>this.editClick(drejtimet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>
                            <button type="button" onClick={()=>this.deleteClick(drejtimet.DrejtimiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>
                        </td>
                    </tr>
                    )}
                </table>
                {insertModal&&<Modal modalSwitch={() => this.setState({insertModal:false})}>
                    <div className={stylist.inputDiv}>
                        <h2>Drejtimi</h2>
                        <div id={stylist.nameInputDiv}>
                            <input type="text" value={Emri} onChange={this.changeEmri} placeholder="Emri"/>
                        </div>
                    </div>
                    {DrejtimiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {DrejtimiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>)
        }
}
export default  Drejtimi;