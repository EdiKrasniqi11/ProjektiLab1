import React, { Component } from "react";
import stylist from "./Specializimi.module.css";
import variables from "../Variables";

export class Specializimi extends Component{
    constructor(props){
        super(props);

        this.state = {
            specializimet:[],
            fakultetet:[],
            drejtimet:[],
            Drejtimi:1,
            Fakulteti:1,
            SpecializimiID:0,
            EmriSpecializimit:""
        }
    }
    refreshList(){
        fetch(variables.API_URL+'fakulteti').then(response=>response.json())
        .then(data=>{this.setState({fakultetet:data});});

        fetch(variables.API_URL+'drejtimi').then(response=>response.json())
        .then(data=>{this.setState({drejtimet:data});});

        fetch(variables.API_URL+'specializimi').then(response=>response.json())
        .then(data=>{this.setState({specializimet:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeDrejtimi = (e) =>{
        this.setState({Drejtimi:e.target.value});
    }
    changeFakulteti = (e) =>{
        this.setState({Fakulteti:e.target.value});
    }
    changeEmriSpecializimit = (e) =>{
        this.setState({EmriSpecializimit:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'specializimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Fakulteti:this.state.Fakulteti,
                Drejtimi:this.state.Drejtimi,
                EmriSpecializimit:this.state.EmriSpecializimit
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
    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'specializimi/'+id,{
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
        fetch(variables.API_URL+'specializimi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SpecializimiID:this.state.SpecializimiID,
                Fakulteti:this.state.Fakulteti,
                Drejtimi:this.state.Drejtimi,
                EmriSpecializimit:this.state.EmriSpecializimit
            })
        }).then(res=>res.json())
        .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
        })
    }
    editClick(specializimet){
        this.setState({
            SpecializimiID:specializimet.SpecializimiID,
             Fakulteti:specializimet.Fakulteti,
             Drejtimi:specializimet.Drejtimi,
             EmriSpecializimit:specializimet.EmriSpecializimit
           
        });
    }
    addClick() {
        this.setState({
          SpecializimiID: 0,
          Fakulteti:1,
          Drejtimi:1,
          EmriSpecializimit:""
        });
    }
    
    selectFakulteti(fakultetet, id){
        for(let i=0;i<fakultetet.length;i++){
            if(fakultetet[i].FakultetiID === id){
                return fakultetet[i].Emri;
            }
        }
    }
    selectDrejtimi(drejtimet, id){
        for(let i=0;i<drejtimet.length;i++){
            if(drejtimet[i].DrejtimiID === id){
                return drejtimet[i].Emri;
            }
        }
    }
    render(){
        const{
            specializimet,
            fakultetet,
            drejtimet,
            Drejtimi,
            Fakulteti,
            EmriSpecializimit,
            SpecializimiID
        }=this.state;
        return(
            <div className={stylist.specializimiDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Specializimin</button>
                <table>
                    <tr>
                        <th>SpecializimiID</th>
                        <th>Fakulteti</th>
                        <th>Drejtimi</th>
                        <th>Emri i specializimit</th>
                        <th>Options</th>
                    </tr>
                    {specializimet.map(specializimet=>
                    <tr key={specializimet.SpecializimiID}>
                        <td>{specializimet.SpecializimiID}</td>
                        <td>{this.selectFakulteti(fakultetet, specializimet.Fakulteti)}</td>
                        <td>{this.selectDrejtimi(drejtimet, specializimet.Drejtimi)}</td>
                        <td>{specializimet.EmriSpecializimit}</td>
                        <td>
                            <button type="button" onClick={()=>this.editClick(specializimet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(specializimet.SpecializimiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                        </td>
                    </tr>
                    )}
                    </table>
                <div>
                    
                        <div id={stylist.fakultetiInputDiv}>
                            <span>Fakulteti</span><br></br>
                            <select className="form-select" onChange={this.changeFakulteti} value={Fakulteti}>
                                {fakultetet.map(fakultetet=><option value={fakultetet.FakultetiID}>
                                    {fakultetet.Emri}
                                </option>)}
                            </select>
                        </div>

                        <div className={stylist.inputDiv}>
                            <div id={stylist.drejtimiInputDiv}>
                            <span>Drejtimi</span><br></br>
                            <select className="form-select" onChange={this.changeDrejtimi} value={Drejtimi}>
                                {drejtimet.map(drejtimet=><option value={drejtimet.DrejtimiID}>
                                    {drejtimet.Emri}
                                </option>)}
                            </select>
                        </div>

                        <div id={stylist.nameInputDiv}>
                            <span>Emri i specializit</span><br></br>
                            <input type="text" value={EmriSpecializimit} onChange={this.changeEmriSpecializimit}/>
                        </div>
                    </div>
                    {SpecializimiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {SpecializimiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </div>
            </div>
        )
    }
}
export default Specializimi;