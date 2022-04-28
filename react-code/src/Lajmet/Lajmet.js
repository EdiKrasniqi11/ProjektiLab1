import React, { Component } from "react";
import variables  from "../Variables";
import stylist from "./Lajmet.module.css";
import  render  from "react-dom";

export class Lajmet extends Component{

    constructor(props){
        super(props);
        
        this.state={
            lajme:[],
            modalTitle:"",
            Titulli:"",
            Pershkrimi:"",
            Foto:"anonymous.png",
            Photopath:variables.PHOTO_URL,
            LajmiID:0
        }
    }
    refreshList(){
        fetch(variables.API_URL+'lajmet')
        .then(response=>response.json())
        .then(data=>{
            this.setState({lajme:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    changeTitulli = (e)=>{
        this.setState({Titulli:e.target.value});
    }
    changePershkrimi = (e)=>{
        this.setState({Pershkrimi:e.target.value});
    }
    addClick() {
        this.setState({
          modalTitle: "Shto lajmet",
          LajmiID: 0,
          Titulli: "",
          Pershkrimi: "",
          Foto:""
        });
      }

    createClick(){
        fetch(variables.API_URL+'lajmet',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Titulli:this.state.Titulli,
                Pershkrimi:this.state.Pershkrimi,
                Foto:this.state.Foto
                
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
        fetch(variables.API_URL+'lajmet/'+id,{
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
        fetch(variables.API_URL+'lajmet',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                LajmiID:this.state.LajmiID,
                Titulli:this.state.Titulli,
                Pershkrimi:this.state.Pershkrimi,
                Foto:this.state.Foto
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
    editClick(lajmet){
        this.setState({
            modalTitle:"Edit lajmetn",
            LajmiID:lajmet.LajmiID,
            Titulli:lajmet.Titulli,
            Pershkrimi:lajmet.Pershkrimi,
            Foto:lajmet.Foto
        });
    }
    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'lajmet/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({Foto:data});
        })
    }

        render(){
            const{
                lajme,
                modalTitle,
                LajmiID,
                Titulli,
                Pershkrimi,
                Photopath,
                Foto
            }=this.state;

    return(
        <div id={stylist.lajmetDiv}>
            <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}>
          Shto Lajmin
        </button>
            <table>
                <thead>
                <tr>
                    <th>
                        LajmiID
                    </th>
                    <th>
                        Titulli
                    </th>
                    <th>
                        Pershkrimi
                    </th>
                    <th>
                        Foto
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
</thead>
<tbody>
    
                {lajme.map(lajmet=>
                    <tr key={lajmet.LajmiID}>
                        <td >{lajmet.LajmiID}</td>
                        <td >{lajmet.Titulli}</td>
                        <td >{lajmet.Pershkrimi}</td>
                        <td >{lajmet.Foto}</td>
                        
                        <td>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(lajmet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg></button>
                            <button type="button" onClick={()=>this.deleteClick(lajmet.LajmiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button>
                        </td>
                    </tr>
                    )}</tbody>
                    </table>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" id={stylist.button} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                          
                            </div>
                        </div>
                    </div>
                    <div id={stylist.formLajmi}>
                        <span id={stylist.inputText}>Lajmi</span>
                      <div id={stylist.inputLajmi}><input type="text" id={stylist.Titulli} value={Titulli} onChange={this.changeTitulli}/></div>
                      <div id={stylist.inputLajmi}><input type="text" id={stylist.Pershkrimi} value={Pershkrimi} onChange={this.changePershkrimi}/></div>
                      <div id={stylist.inputLajmi}> <input type="file" id={stylist.Foto}  onChange={this.imageUpload}/></div>
 
                        {LajmiID ==0?
                        <button type="button" id={stylist.button1} onClick={()=>this.createClick()}>Create</button>
                        :null}
                        {LajmiID !=0?
                        <button type="button" id={stylist.button1} onClick={()=>this.updateClick()}>Update</button>
                        :null}

                    </div>
        </div>
    )
}
}
export default Lajmet;