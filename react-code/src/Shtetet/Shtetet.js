import React, { Component } from "react";
import variables  from "../Variables";
import ShtetiCSS from "../Shtetet/Shtetet.module.css";
import  render  from "react-dom";
import Modal from '../AnyUseComponents/Modal'

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
            
        })
    }
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
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(shtetet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg></button>
                            <button type="button" onClick={()=>this.deleteClick(shtetet.ShtetiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button>
                        </td>
                    </tr>
                    )}</tbody>
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