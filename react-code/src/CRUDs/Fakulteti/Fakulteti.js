import React, { Component } from "react";
import stylist from "./Fakulteti.module.css";
import variables from "../Variables";
import Modal from '../../AnyUseComponents/Modal/Modal'
import {NavLink} from "react-router-dom"

export class Fakulteti extends Component{
    constructor(props){
        super(props);

        this.state = {
            fakultetet:[],
            shtetet:[],
            Emri:"",
            Shteti:0,
            FakultetiID:0,
            insertModal:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'fakulteti').then(response=>response.json())
        .then(data=>{this.setState({fakultetet:data});});

        fetch(variables.API_URL+'shteti').then(response=>response.json())
        .then(data=>{this.setState({shtetet:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmri = (e) =>{
        this.setState({Emri:e.target.value});
    }
    changeShteti = (e) =>{
        this.setState({Shteti:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'fakulteti',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:this.state.Emri,
                Shteti:this.state.Shteti
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
            fetch(variables.API_URL+'fakulteti/'+id,{
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
        fetch(variables.API_URL+'fakulteti',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FakultetiID:this.state.FakultetiID,
                Emri:this.state.Emri,
                Shteti:this.state.Shteti
            })
        }).then(res=>res.json())
        .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
        })
        this.setState({insertModal:false})
    }
    addClick() {
        this.setState({
          FakultetiID: 0,
          Emri: "",
          Shteti:0,
          insertModal:true
        });
    }
    getURL(fakulteti){
        return "/university/drejtimet/"+fakulteti.FakultetiID
    }
    getURL2(fakulteti){
        return "/university/deget/"+fakulteti.FakultetiID
    }
    editClick(fakultetet){
        this.setState({
            FakultetiID:fakultetet.FakultetiID,
            Emri:fakultetet.Emri,
            Shteti:fakultetet.Shteti,
            insertModal:true
        });
    }
    selectShteti(shtetet, id){
        for(let i=0;i<shtetet.length;i++){
            if(shtetet[i].ShtetiID === id){
                return shtetet[i].Emri;
            }
        }
    }
    render(){
        const{
            fakultetet,
            shtetet,
            FakultetiID,
            Emri,
            Shteti,
            insertModal
        }=this.state;
        return(
            <div className={stylist.fakultetiDiv}>
                <div id={stylist.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
                </div>
                <table>
                    <tr>
                        <th>FakultetiID</th>
                        <th>Emri</th>
                        <th>Shteti</th>
                        <th>Options</th>
                    </tr>
                    {fakultetet.map(fakultetet=>
                    <tr key={fakultetet.FakultetiID}>
                        <td>{fakultetet.FakultetiID}</td>
                        <td>{fakultetet.Emri}</td>
                        <td>{this.selectShteti(shtetet, fakultetet.Shteti)}</td>
                        <td>
                            <NavLink to={this.getURL(fakultetet)}><button type="button" title="Drejtimet"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/></svg></button></NavLink>
                            <NavLink to={this.getURL2(fakultetet)}><button type="button" title="Deget"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg></button></NavLink>
                            <button type="button" onClick={()=>this.editClick(fakultetet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(fakultetet.FakultetiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                        </td>
                    </tr>
                    )}
                </table>
                {insertModal?<Modal modalSwitch={() => this.setState({insertModal: false})}>
                    <h2>Fakulteti</h2>
                    <div id={stylist.nameInputDiv}>
                        <input type="text" value={Emri} onChange={this.changeEmri} placeholder="Emri"/>
                    </div>
                    <div id={stylist.shtetiInputDiv}>
                        <select onChange={this.changeShteti} value={Shteti}>
                            <option value="0">Shteti</option>
                            {shtetet.map(shtetet=><option value={shtetet.ShtetiID}>
                                {shtetet.Emri}
                            </option>)}
                        </select>
                    </div>
                    {FakultetiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {FakultetiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>:null}
            </div>
        )
    }
}
export default  Fakulteti;