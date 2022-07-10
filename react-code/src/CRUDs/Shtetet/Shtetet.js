import React, { Component } from "react";
import variables  from "../Variables";
import ShtetiCSS from "../Shtetet/Shtetet.module.css"
import Modal from '../../AnyUseComponents/Modal'
import {NavLink} from "react-router-dom"

export class Shtetet extends Component{

    constructor(props){
        super(props);
        
        this.state={
            shtete:[],
            modalTitle:"",
            Emri:"",
            ShtetiID:0,
            insertModal:false,
            dataModal:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'shteti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({shtete:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmri = (e)=>{
        this.setState({Emri:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'shteti',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:this.state.Emri
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
    addClick() {
        this.setState({
          modalTitle: "Shto Shtetin",
          ShtetiID: 0,
          Emri: "",
          insertModal:true
        });
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'shteti/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            
        })}
    }
    updateClick(){
        fetch(variables.API_URL+'shteti',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ShtetiID:this.state.ShtetiID,
                Emri:this.state.Emri
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
    getURL(shteti){
        return "/university/qytetet/"+shteti.ShtetiID
    }
    editClick(shtetet){
        this.setState({
            modalTitle:"Edit Emri",
            ShtetiID:shtetet.ShtetiID,
            Emri:shtetet.Emri,
            insertModal:true
        });
    }
    render(){
        const{
            shtete,
            modalTitle,
            ShtetiID,
            insertModal,
            Emri
        }=this.state;
    return(
        <div className={ShtetiCSS.shtetetDiv}>
            <div id={ShtetiCSS.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={ShtetiCSS.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>
                        ShtetiID
                    </th>
                    <th>
                        Emri
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
                </thead>
                <tbody>
                {shtete.map(shtetet=>
                    <tr key={shtetet.ShtetiID}>
                        <td>{shtetet.ShtetiID}</td>
                        <td>{shtetet.Emri}</td>
                        <td>
                            <NavLink to={this.getURL(shtetet)}><button type="button" title="Qytetet"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/></svg></button></NavLink>
                            <button type="button" onClick={()=>this.editClick(shtetet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>
                            <button type="button" onClick={()=>this.deleteClick(shtetet.ShtetiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <h2>Shteti</h2>
                    <div id={ShtetiCSS.inputShteti}>
                        <input type="text" id={ShtetiCSS.emriShtetit} value={Emri} onChange={this.changeEmri} placeholder="Emri"/>
                    </div>
                    {ShtetiID ==0?
                    <button type="button" id={ShtetiCSS.button1} onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {ShtetiID !=0?
                    <button type="button" id={ShtetiCSS.button1} onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
        </div>
        )
    }
}
export default Shtetet;