import React, { Component } from "react";
import variables  from "../Variables";
import stylist from "./Galeria.module.css";
import Modal from '../../AnyUseComponents/Modal/Modal'
import MediaHead from "../../AnyUseComponents/MediaHead/MediaHead";
import secureLocalStorage from "react-secure-storage";

export class Galeria extends Component{

    constructor(props){
        super(props);
        
        this.state={
            galeri:[],
            modalTitle:"",
            Pershkrimi:"",
            Foto:"anonymous.png",
            Photopath:variables.PHOTO_URL,
            GaleriaID:0,
            insertModal:false,
            dataModal:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'galeria')
        .then(response=>response.json())
        .then(data=>{
            this.setState({galeri:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
 
    changePershkrimi = (e)=>{
        this.setState({Pershkrimi:e.target.value});
    }
    addClick() {
        this.setState({
          modalTitle: "",
          GaleriaID: 0,
          Pershkrimi: "",
          Foto:"",
          insertModal:true
        });
      }
    createClick(){
        fetch(variables.API_URL+'galeria',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
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
        this.setState({
            insertModal:false
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'galeria/'+id,{
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
        fetch(variables.API_URL+'galeria',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                GaleriaID:this.state.GaleriaID,
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
        this.setState({
            insertModal:false
        })
    }
    editClick(galerite){
        this.setState({
            modalTitle:"",
            GaleriaID:galerite.GaleriaID,
            Pershkrimi:galerite.Pershkrimi,
            Foto:galerite.Foto,
            insertModal:true
        });
    }
    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'galeria/savefile',{
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
                galeri,
                modalTitle,
                GaleriaID,
                Pershkrimi,
                Photopath,
                Foto,
                insertModal,
                dataModal
            }=this.state;

    return(
        <div className={stylist.galeriaDiv}>
            <MediaHead title="Galeria" />
            <div id={stylist.showDiv}>
                {galeri.map(galerite=>
                    <div class={stylist.foto} id={galerite.id}>
                        <img src={Photopath+galerite.Foto}/>
                        <div id={stylist.fotoDesc}>
                            <h4 title={galerite.Pershkrimi}>{galerite.Pershkrimi}</h4>
                            {secureLocalStorage.getItem('role') == 'admin' || secureLocalStorage.getItem('role') == 'professor'?<div id={stylist.optionDiv}>
                                <button type="button" onClick={()=>this.editClick(galerite)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>
                                <button type="button" onClick={()=>this.deleteClick(galerite.GaleriaID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>
                            </div>:null}
                        </div>
                    </div>
                )}
            </div>
            {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
            <div id={stylist.formGaleria}>
                <h2>Galeria</h2>
                    <div id={stylist.inputPershkrimi}><input type="text" id={stylist.Pershkrimi} value={Pershkrimi} onChange={this.changePershkrimi} placeholder="Pershkrimi"/></div>
                    <div id={stylist.inputFoto}> <input type="file" id={stylist.Foto}  onChange={this.imageUpload}/></div>
                </div>
                {GaleriaID ==0?
                <button type="button" onClick={()=>this.createClick()}>Create</button>
                :null}
                {GaleriaID !=0?
                <button type="button" id={stylist.button1} onClick={()=>this.updateClick()}>Update</button>
                :null}
                </Modal>}
            </div>
    );
}
}
export default Galeria;