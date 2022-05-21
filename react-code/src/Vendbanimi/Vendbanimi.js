import React, { Component } from "react";
import stylist from "./Vendbanimi.module.css";
import variables from "../Variables";

export class Vendbanimi extends Component{
    constructor(props){
        super(props);

        this.state = {
            vendbanimet:[],
            shtetet:[],
            qytetet:[],
            Adresa:"",
            ShtetiID:0,
            QytetiID:0,
            VendbanimiID:0
        }
    }
    refreshList(){
        fetch(variables.API_URL+'vendbanimi').then(response=>response.json())
        .then(data=>{this.setState({vendbanimet:data});});

        fetch(variables.API_URL+'shteti').then(response=>response.json())
        .then(data=>{this.setState({shtetet:data});});

        fetch(variables.API_URL+'qyteti').then(response=>response.json())
        .then(data=>{this.setState({qytetet:data});});

        
    }
    componentDidMount(){
        this.refreshList();
    }
    changeShteti = (e) =>{
        this.setState({Shteti:e.target.value});
    }
    changeQyteti = (e) =>{
        this.setState({Qyteti:e.target.value});
    }
    changeAdresa = (e) =>{
        this.setState({Adresa:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'vendbanimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Shteti:this.state.Shteti,
                Qyteti:this.state.Qyteti,
                Adresa:this.state.Adresa
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
          VendbanimiID: 0,
          Shteti:0,
          Qyteti:0,
          Adresa:""
          
        });
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'vendbanimi/'+id,{
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
        fetch(variables.API_URL+'vendbanimi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VendbanimiID:this.state.VendbanimiID,
                Shteti:this.state.Shteti,
                Qyteti:this.state.Qyteti,
                Adresa:this.state.Adresa
            })
        }).then(res=>res.json())
        .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
        })
    }
    editClick(vendbanimet){
        this.setState({
            VendbanimiID:vendbanimet.VendbanimiID,
            Shteti:vendbanimet.Shteti,
            Qyteti:vendbanimet.Qyteti,
            Adresa:vendbanimet.Adresa
        });
    }
    selectShteti(shtetet, id){
        for(let i=0;i<shtetet.length;i++){
            if(shtetet[i].ShtetiID === id){
                return shtetet[i].Emri;
            }
        }
    }
    selectQyteti(qytetet, id){
        for(let i=0;i<qytetet.length;i++){
            if(qytetet[i].QytetiID === id){
                return qytetet[i].Emri;
            }
        }
    }
    render(){
        const{
            vendbanimet,
            shtetet,
            qytetet,
            VendbanimiID,
            Shteti,
            Qyteti,
            Adresa
            
        }=this.state;
        return(
            <div className={stylist.vendbanimiDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Vendbanimin</button>
                <table>
                    <tr>
                        <th>VendbanimiID</th>
                        <th>Shteti</th>
                        <th>Qyteti</th>
                        <th>Adresa</th>
                        <th>Options</th>
                    </tr>
                    {vendbanimet.map(vendbanimet=>
                    <tr key={vendbanimet.VendbanimiID}>
                        <td>{vendbanimet.VendbanimiID}</td>
                        <td>{this.selectShteti(shtetet, vendbanimet.Shteti)}</td>
                        <td>{this.selectQyteti(qytetet, vendbanimet.Qyteti)}</td>
                        <td>{vendbanimet.Adresa}</td>
                        
                        <td>
                            <button type="button" onClick={()=>this.editClick(vendbanimet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(vendbanimet.VendbanimiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                        </td>
                    </tr>
                    )}
                </table>
                <div>
                    <div id={stylist.shtetiInputDiv}>
                            <span>Shteti</span><br></br>
                            <select className="form-select" onChange={this.changeShteti} value={Shteti}>
                                {shtetet.map(shtetet=><option value={shtetet.ShtetiID}>
                                    {shtetet.Emri}
                                </option>)}
                            </select>
                        </div>

                    <div id={stylist.qytetiInputDiv}>
                            <span>Qyteti</span><br></br>
                            <select className="form-select" onChange={this.changeQyteti} value={Qyteti}>
                                {qytetet.map(qytetet=><option value={qytetet.QytetiID}>
                                    {qytetet.Emri}
                                </option>)}
                            </select>
                    </div>

                    <div className={stylist.inputDiv}>
                        <div id={stylist.nameInputDiv}>
                            <span>Adresa e vendbanimit</span><br></br>
                            <input type="text" value={Adresa} onChange={this.changeAdresa}/>
                        </div>
                        
                    </div>
                    {VendbanimiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {VendbanimiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </div>
            </div>
        )
    }
}
export default  Vendbanimi;