import React, { Component } from "react";
import stylist from "./Drejtimi.module.css";
import variables from "../Variables";

export class Drejtimi extends Component{cd
    constructor(props){
        super(props);

        this.state = {
            drejtimet:[],
            fakultetet:[],
            Emri:"",
            Fakulteti:1,
            DrejtimiID:0
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
    changeFakulteti = (e) =>{
        this.setState({Fakulteti:e.target.value});
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
    }
    addClick() {
        this.setState({
          DrejtimiID: 0,
          Emri: "",
          Fakulteti:1
        });
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
    }
    editClick(drejtimet){
        this.setState({
            DrejtimiID:drejtimet.DrejtimiID,
            Emri:drejtimet.Emri,
            Fakulteti:drejtimet.Fakulteti
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
            Fakulteti
        }=this.state;
        return(
            <div className={stylist.drejtimiDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Drejtimin</button>
                <table>
                    <tr>
                        <th>DrejtimiID</th>
                        <th>Emri</th>
                        <th>Fakulteti</th>
                        <th>Options</th>
                    </tr>
                    {drejtimet.map(drejtimet=>
                    <tr key={drejtimet.DrejtimiID}>
                        <td>{drejtimet.DrejtimiID}</td>
                        <td>{drejtimet.Emri}</td>
                        <td>{this.selectFakulteti(fakultetet, drejtimet.Fakulteti)}</td>
                        <td>
                            <button type="button" onClick={()=>this.editClick(drejtimet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(drejtimet.DrejtimiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                        </td>
                    </tr>
                    )}
                </table>
                <div>
                    <div className={stylist.inputDiv}>
                        <div id={stylist.nameInputDiv}>
                            <span>Emri i Drejtimit</span><br></br>
                            <input type="text" value={Emri} onChange={this.changeEmri}/>
                        </div>
                        <div id={stylist.fakultetiInputDiv}>
                            <span>Fakulteti</span><br></br>
                            <select className="form-select" onChange={this.changeFakulteti} value={Fakulteti}>
                            <option value="0">Fakulteti</option>
                                {fakultetet.map(fakultetet=><option value={fakultetet.FakultetiID}>
                                    {fakultetet.Emri}
                                </option>)}
                            </select>
                        </div>
                    </div>
                    {DrejtimiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {DrejtimiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </div>
            </div>
        )
    }
}
export default  Drejtimi;