import React, { Component } from "react";
import stylist from "./Fakulteti.module.css";
import variables from "../Variables";

export class Fakulteti extends Component{
    constructor(props){
        super(props);

        this.state = {
            fakultetet:[],
            shtetet:[],
            Emri:"",
            Shteti:0,
            FakultetiID:0
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
    }
    addClick() {
        this.setState({
          FakultetiID: 0,
          Emri: "",
          Shteti:0
        });
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
    }
    editClick(fakultetet){
        this.setState({
            FakultetiID:fakultetet.FakultetiID,
            Emri:fakultetet.Emri,
            Shteti:fakultetet.Shteti
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
            Shteti
        }=this.state;
        return(
            <div className={stylist.fakultetiDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Fakultetin</button>
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
                <div>
                    <div className={stylist.inputDiv}>
                        <div id={stylist.nameInputDiv}>
                            <span>Emri i Universitetit</span><br></br>
                            <input type="text" value={Emri} onChange={this.changeEmri}/>
                        </div>
                        <div id={stylist.shtetiInputDiv}>
                            <span>Shteti</span><br></br>
                            <select className="form-select" onChange={this.changeShteti} value={Shteti}>
                                {shtetet.map(shtetet=><option value={shtetet.ShtetiID}>
                                    {shtetet.Emri}
                                </option>)}
                            </select>
                        </div>
                    </div>
                    {FakultetiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {FakultetiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </div>
            </div>
        )
    }
}
export default  Fakulteti;