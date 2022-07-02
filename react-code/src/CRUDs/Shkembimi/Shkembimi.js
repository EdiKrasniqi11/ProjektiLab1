import React, {Component} from 'react'
import variables from '../Variables'
import stylist from './Shkembimi.module.css'
import Modal from '../../AnyUseComponents/Modal'

export class Shkembimi extends Component{
    constructor(props){
        super(props);

        this.state = {
            shkembimet: [],
            studentet: [],
            fakultetet: [],
            fakultetetFilter: [],
            Studenti: 0,
            Fakulteti: 0,
            ShkembimiStatus:0,
            insertModal: false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'shkembimi').then(response=>response.json())
        .then(data=>{this.setState({shkembimet:data});});

        fetch(variables.API_URL+'studenti').then(response=>response.json())
        .then(data=>{this.setState({studentet:data});});

        fetch(variables.API_URL+'fakulteti').then(response=>response.json())
        .then(data=>{this.setState({fakultetet:data}); this.setState({fakultetetFilter:data})});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeStudenti = e =>{
        this.setState({Studenti: e.target.value});

        var fakulteti = this.state.studentet.find(element=> element.StudentiID == e.target.value).Fakulteti;
        var selFakultetet = this.state.fakultetet.filter(element=> element.FakultetiID != fakulteti);
        this.setState({fakultetetFilter: selFakultetet});
    }
    changeFakulteti = e =>{
        this.setState({Fakulteti: e.target.value});
    }
    createClick(){
        console.log(this.state.Studenti)
        fetch(variables.API_URL+'shkembimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Studenti: this.state.Studenti,
                Fakulteti: this.state.Fakulteti
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            })
        this.setState({
            insertModal:false,
        })
    }
    updateClick(){
        fetch(variables.API_URL+'shkembimi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Studenti:this.state.Studenti,
                Fakulteti:this.state.Fakulteti
            })
        }).then(res=>res.json())
        .then((result)=>{
                alert(result);
                this.refreshList();
            })
        this.setState({
            insertModal:false
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'shkembimi/'+id,{
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
    editClick(shkembimet){
        this.setState({
            Studenti:shkembimet.Studenti,
            Fakulteti:shkembimet.Fakulteti,
            insertModal:true,
            ShkembimiStatus:1
        })
    }
    addClick(){
        this.setState({
            Studenti:0,
            Fakulteti:0,
            insertModal:true,
            ShkembimiStatus:0
        })
    }
    selectStudenti(studentet, id){
        for(let i=0;i<studentet.length;i++){
            if(studentet[i].StudentiID == id){
                return studentet[i].Emri;
            }
        }
    }
    selectFakulteti(fakultetet, id){
        for(let i=0;i<fakultetet.length;i++){
            if(fakultetet[i].FakultetiID == id){
                return fakultetet[i].Emri;
            }
        }
    }
    render(){
        const{
            shkembimet,
            studentet,
            fakultetet,
            fakultetetFilter,
            Studenti,
            Fakulteti,
            insertModal,
            ShkembimiStatus
        }=this.state
        return(
            <div className={stylist.shkembimiDiv}>
                <div id={stylist.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
                </div>
                <table>
                    <tr>
                        <th>StudentiID</th>
                        <th>Studenti</th>
                        <th>Fakulteti</th>
                        <th>Options</th>
                    </tr>
                        {shkembimet.map(shkembimet=>
                        <tr key={shkembimet.Studenti}>
                            <td>{shkembimet.Studenti}</td>
                            <td>{this.selectStudenti(studentet,shkembimet.Studenti)}</td>
                            <td>{this.selectFakulteti(fakultetet,shkembimet.Fakulteti)}</td>
                            <td>
                            <button type="button" onClick={()=>this.viewData()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.editClick(shkembimet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(shkembimet.Studenti)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                            </td>
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <div id={stylist.formProvimi}>
                        <h2>Shkembimi Studentore</h2>
                        {ShkembimiStatus==0?
                        <div id={stylist.studentiInputDiv}>
                            <select onChange={this.changeStudenti} value={Studenti}>
                                <option value="0">Studenti</option>
                                       {studentet.map(studentet =>
                                    <option value={studentet.StudentiID}>{studentet.Emri}</option>
                           )}
                            </select>
                        </div>:null}
                        <div id={stylist.fakultetiInputDiv}>
                            <select onChange={this.changeFakulteti} value={Fakulteti}>
                                <option value="0">Fakulteti</option>
                                       {fakultetetFilter.map(fakultetet =>
                                    <option value={fakultetet.FakultetiID}>{fakultetet.Emri}</option>
                           )}
                            </select>
                        </div>
                    </div>
                    {ShkembimiStatus == 0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {ShkembimiStatus != 0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>
        )
    }
}

export default Shkembimi