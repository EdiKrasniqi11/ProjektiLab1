import React, { Component } from "react";
import stylist from "./Specializimi.module.css";
import variables from "../Variables";
import Modal from '../../AnyUseComponents/Modal/Modal'

export class Specializimi extends Component{
    constructor(props){
        super(props);

        let URLcomponents = window.location.href.split('/');

        this.state = {
            specializimet:[],
            fakultetet:[],
            drejtimet:[],
            filterDrejtimi:[],
            Drejtimi:URLcomponents[6],
            Fakulteti:URLcomponents[5],
            SpecializimiID:0,
            LajmiID:0,
            EmriSpecializimit:"",
            insertModal:false,
            dataModal:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'fakulteti').then(response=>response.json())
        .then(data=>{this.setState({fakultetet:data});});

        fetch(variables.API_URL+'drejtimi').then(response=>response.json())
        .then(data=>{this.setState({drejtimet:data}); this.setState({filterDrejtimi:data});});

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

        var selDrejtimi = this.state.drejtimet.filter(item => item.Fakulteti == e.target.value)
        this.setState({filterDrejtimi: selDrejtimi})
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
        this.setState({
            insertModal:false
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
        this.setState({
            insertModal:false
        })
    }
    editClick(specializimet){
        this.setState({
            SpecializimiID:specializimet.SpecializimiID,
             Fakulteti:specializimet.Fakulteti,
             Drejtimi:specializimet.Drejtimi,
             EmriSpecializimit:specializimet.EmriSpecializimit,
             insertModal:true

        });
    }
    addClick() {
        this.setState({
          SpecializimiID: 0,
          EmriSpecializimit:"",
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
            filterDrejtimi,
            Drejtimi,
            Fakulteti,
            EmriSpecializimit,
            SpecializimiID,
            insertModal,
            dataModal
        }=this.state;
        return(
            <div className={stylist.specializimiDiv}>
                <div id={stylist.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
                </div>
                <table>
                    <tr>
                        <th>SpecializimiID</th>
                        <th>Fakulteti</th>
                        <th>Drejtimi</th>
                        <th>Emri i specializimit</th>
                        <th>Options</th>
                    </tr>
                    {specializimet.filter(specializimi => specializimi.Drejtimi == Drejtimi).map(specializimet=>
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
                
                    {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                        <h2>Specializimi</h2>
                        <div id={stylist.inputDiv}>
                            <input type="text" value={EmriSpecializimit} onChange={this.changeEmriSpecializimit} placeholder="Emri"/>
                        </div>
                        {SpecializimiID ==0?
                            <button type="button" onClick={()=>this.createClick()}>Create</button>
                        :null}
                        {SpecializimiID !=0?
                            <button type="button" onClick={()=>this.updateClick()}>Update</button>
                        :null}
                    </Modal>}
            </div>
        )
    }
}
export default Specializimi;