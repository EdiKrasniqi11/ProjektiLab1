import React,{Component} from 'react'
import stylist from './Lenda.module.css'
import variables from '../Variables'
import Modal from '../AnyUseComponents/Modal'

export class Lenda extends Component{
    constructor(props){
        super(props);

        this.state = {
            lendet:[],
            profesoret:[],
            Emri:"",
            drejtimet:[],
            filterProfesori:[],
            ECTS:"",
            LendaID:0,
            Profesori: 0,
            Drejtimi:0,
	    insertModal:false,
        dataModal:false

        }
    }
    refreshList(){
        fetch(variables.API_URL+'lenda').then(response=>response.json())
        .then(data=>{this.setState({lendet:data});});

        fetch(variables.API_URL+'profesori').then(response=>response.json())
        .then(data=>{this.setState({profesoret:data});});

        fetch(variables.API_URL+'drejtimi').then(response=>response.json())
        .then(data=>{this.setState({drejtimet:data}); this.setState({filterProfesori:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeProfesori = (e) =>{
        this.setState({Profesori:e.target.value});
    }
    changeEmri = (e) =>{
        this.setState({Emri:e.target.value});
    }
    changeDrejtimi = (e) =>{
        this.setState({Drejtimi:e.target.value});

        var selProfesori = this.state.profesoret.filter(item => item.Drejtimi == e.target.value)
        this.setState({filterProfesori: selProfesori})
    }
    changeECTS = (e) =>{
        this.setState({ECTS:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'lenda',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
		        Profesori:this.state.Profesori,
                Emri:this.state.Emri,
                Drejtimi:this.state.Drejtimi,
                ECTS:this.state.ECTS
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            })
        this.setState({
            insertModal:false
        })
    }
    updateClick(){
        fetch(variables.API_URL+'lenda',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                LendaID:this.state.LendaID,
		        Profesori:this.state.Profesori,
                Emri:this.state.Emri,
                Drejtimi:this.state.Drejtimi,
                ECTS:this.state.ECTS
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
            fetch(variables.API_URL+'lenda/'+id,{
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
    editClick(lendet){
        this.setState({
            LendaID:lendet.LendaID,
	        Profesori:lendet.Profesori,
            Emri:lendet.Emri,
            Drejtimi:lendet.Drejtimi,
            ECTS:lendet.ECTS,
            insertModal:true
        });
    }
    addClick() {
        this.setState({
            LendaID:0,
	        Profesori:0,
            Emri:"",
            Drejtimi:0,
            ECTS:"",
            insertModal:true
        });
    }
    
    selectDrejtimi(drejtimet, id){
        for(let i=0;i<drejtimet.length;i++){
            if(drejtimet[i].DrejtimiID === id){
                return drejtimet[i].Emri;
            }
        }
    }
    selectProfesori(profesoret, id){
        for(let i=0;i<profesoret.length;i++){
            if(profesoret[i].ProfesoriID === id){
                return profesoret[i].Emri;
            }
        }
    }
    render(){
        const{
            lendet,
            profesoret,
            drejtimet,
            LendaID,
	        Profesori,
            filterProfesori,
            Emri,
            ECTS,
            Drejtimi,
            insertModal,
            dataModal
        }=this.state;

        return(
            <div className={stylist.LendaDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Lenden</button>
                <table>
                    <tr>
                        <th>LendaID</th>
			            <th>Profesori</th>
                        <th>Emri</th>
                        <th>Drejtimi</th>
                        <th>ECTS</th>
                        <th>Options</th>
                    </tr>
                    {lendet.map(lendet=>
                        <tr key={lendet.LendaID}>
                            <td>{lendet.LendaID}</td>
			                <td>{this.selectProfesori(profesoret, lendet.Profesori)}</td>
                            <td>{lendet.Emri}</td>
			                <td>{this.selectDrejtimi(drejtimet, lendet.Drejtimi)}</td>
                            <td>{lendet.ECTS}</td>
                            <button type="button" onClick={()=>this.editClick(lendet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(lendet.LendaID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                            
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <div id={stylist.formLenda}>
                        <h2>Lenda</h2>
                        <div id={stylist.emriInputDiv}>
                            <input type="text" value={Emri} onChange={this.changeEmri} placeholder="Emri"/>
                        </div>
                        <div id={stylist.emriInputDiv}>
                            <input type="text" value={ECTS} onChange={this.changeECTS} placeholder="ECTS"/>
                        </div>
                        
                        <div id={stylist.ProfesoriInputDiv}>
                            <select onChange={this.changeProfesori} value={Profesori}>
                                <option value="0">Profesori</option>
                                       {filterProfesori.map(profesoret =>
                                    <option value={profesoret.ProfesoriID}>{profesoret.Emri}</option>
                           )}
                            </select>
                        </div>
                        <div id={stylist.drejtimiInputDiv}>
                            <select onChange={this.changeDrejtimi} value={Drejtimi}>
                                <option value="0">Drejtimi</option>
                                {drejtimet.map(drejtimet =>
                                    <option value={drejtimet.DrejtimiID}>{drejtimet.Emri}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                    {LendaID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {LendaID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>
        );
    }
}

export default Lenda