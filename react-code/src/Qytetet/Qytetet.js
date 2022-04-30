import React, { Component } from "react";
import variables  from "../Variables";
import QytetiCSS from "../Qytetet/Qytetet.module.css";
import  render  from "react-dom";

export class Qytetet extends Component{

    constructor(props){
        super(props);
        
        this.state={
            shtete:[],
            qytete:[],
            modalTitle:"",
            Emri:"",
            Shteti:"",
            QytetiID:0
        }
    }
    refreshList(){
        fetch(variables.API_URL+'qyteti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({qytete:data});
        });
    
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
    changeShteti = (e)=>{
        this.setState({Shteti:e.target.value});
    }
    
    
    createClick(){
        fetch(variables.API_URL+'qyteti',{
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
          modalTitle: "",
          QytetiID: 0,
          Emri: "",
          Shteti:""
        });
      }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'qyteti/'+id,{
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
        fetch(variables.API_URL+'qyteti',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                QytetiID:this.state.QytetiID,
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
    editClick(qytetet){
        this.setState({
            modalTitle:"Edit Emri",
            QytetiID:qytetet.QytetiID,
            Emri:qytetet.Emri,
            Shteti:qytetet.Shteti
        });
    }

        render(){
            const{
                qytete,
                shtete,
                modalTitle,
                QytetiID,
                Emri,
                Shteti
            }=this.state;

    return(
        <div id={QytetiCSS.qytetetDiv}>
             <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}>
          Shto Qytetin
        </button>
            <table>
                <thead>
                <tr>
                    <th>
                        QytetiID
                    </th>
                    <th>
                        Emri
                    </th>
                    <th>
                        Shteti
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
</thead>
<tbody>
                {qytete.map(qytetet=>
                    <tr key={qytetet.QytetiID}>
                        <td>{qytetet.QytetiID}</td>
                        <td>{qytetet.Emri}</td>
                        <td>{qytetet.Shteti}</td>
                        <td>
                            <button type="button" onClick={()=>this.editClick(qytetet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg></button>
                            <button type="button" onClick={()=>this.deleteClick(qytetet.QytetiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button>
                        </td>
                    </tr>
                    )}</tbody>
                    </table>

                    <div>
                        <div>
                            <div>
                                <div>
                                    <h5>{modalTitle}</h5>
                                </div>
                          
                            </div>
                        </div>
                    </div>
                    <div id={QytetiCSS.formShteti}>
                        <span id={QytetiCSS.inputText}>Qyteti</span>
                      <div id={QytetiCSS.inputShteti}><input type="text" id={QytetiCSS.emriQytetit} value={Emri} onChange={this.changeEmri}/>
                      
                      <select className="form-select"
            onChange={this.changeShteti}
            value={Shteti}>
                {shtete.map(shtetet=><option key={shtetet.ShtetiID}>
                    {shtetet.Emri}
                </option>)}
            </select>
            </div>

                        {QytetiID ==0?
                        <button type="button" id={QytetiCSS.button1} onClick={()=>this.createClick()}>Create</button>
                        :null}
                        {QytetiID !=0?
                        <button type="button" id={QytetiCSS.button1} onClick={()=>this.updateClick()}>Update</button>
                        :null}

                    </div>
        </div>
    )
}
}
export default Qytetet;