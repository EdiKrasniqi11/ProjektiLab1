import React,{Component} from 'react'
import stylist from './VleresoStudentet.module.css'
import variables from '../../../CRUDs/Variables'
import Modal from '../../../AnyUseComponents/Modal/Modal'
import secureLocalStorage from 'react-secure-storage'

export class Vleresimi extends Component{
    constructor(props){
        super(props)
        this.state ={
            vleresimet: [],
            studentet: [],
            studentetFilter: [],
            lendet: [],
            provimet: [],
            Profesori:JSON.parse(secureLocalStorage.getItem("user")),
            Studenti: 0,
            Lenda: 0,
            Nota: 0,
            insertModal: false,
            VleresimiStatus: 0
        }
    }
    refreshList(){
        fetch(variables.API_URL+'vleresimi').then(response => response.json())
        .then(data=>{this.setState({vleresimet: data})})

        fetch(variables.API_URL+'studenti').then(response => response.json())
        .then(data=>{this.setState({studentet: data, studentetFilter: data})})
        
        fetch(variables.API_URL+'lenda').then(response => response.json())
        .then(data=>{this.setState({lendet: data})})

        fetch(variables.API_URL+'provimi').then(response => response.json())
        .then(data=>{this.setState({provimet: data})})
    }
    componentDidMount(){
        this.refreshList()
    }
    changeStudenti = (e) =>{
        this.setState({Studenti: e.target.value})
    }
    changeLenda = (e) =>{
        this.setState({Lenda: e.target.value})

        var selProvimet = this.state.provimet.filter(provimi => provimi.Lenda == e.target.value);
        var count = 0
        var studentet = []
        selProvimet.map(provimet => studentet[count++] = provimet.Studenti)
        var selStudentet = this.state.studentet.filter(studenti => studentet.includes(studenti.StudentiID))
        this.setState({studentetFilter: selStudentet.filter(studenti => this.state.vleresimet.find(vleresimi => vleresimi.Studenti == studenti.StudentiID && vleresimi.Lenda == e.target.value)==null)})
    }
    changeNota = (e) =>{
        this.setState({Nota: e.target.value})
    }
    createClick(){
        console.log(this.state.Studenti + ' - ' + this.state.Lenda + ' - ' + this.state.Nota)
        fetch(variables.API_URL+'vleresimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Studenti:this.state.Studenti,
                Lenda:this.state.Lenda,
                Nota:this.state.Nota
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
        fetch(variables.API_URL+'vleresimi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Studenti:this.state.Studenti,
                Lenda:this.state.Lenda,
                Nota:this.state.Nota
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
    deleteClick(studenti,lenda){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'vleresimi/'+studenti+'/'+lenda,{
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
    editClick(vleresimi){
        this.setState({
            Studenti:vleresimi.Studenti,
            Lenda:vleresimi.Lenda,
            Nota:vleresimi.Nota,
            insertModal:true,
            VleresimiStatus:1
        })
    }
    addClick(){
        this.setState({
            Studenti:0,
            Nota:0,
            insertModal:true,
            VleresimiStatus:0
        })
    }
    selectStudenti(studentet, id){
        for(let i=0;i<studentet.length;i++){
            if(studentet[i].StudentiID === id){
                return studentet[i].Emri;
            }
        }
    }
    selectLenda(lendet, id){
        for(let i=0;i<lendet.length;i++){
            if(lendet[i].LendaID == id){
                
                return lendet[i].Emri
            }
        }
    }
    render(){
        const{
            vleresimet,
            studentet,
            studentetFilter,
            lendet,
            provimet,
            Profesori,
            Studenti,
            Lenda,
            Nota,
            insertModal,
            VleresimiStatus
        }=this.state
        return(
            <div className={stylist.vleresimiDiv}>
                <div id={stylist.buttonDiv}>
                    <select onChange={this.changeLenda} value={Lenda}>
                            <option value="0">Lenda</option>
                            {lendet.filter(lenda => lenda.Profesori == Profesori.ProfesoriID).map(lendet =>
                                <option value={lendet.LendaID}>{lendet.Emri}
                            </option>)}
                    </select>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
                </div>
                <table>
                    <tr>
                        <th>StudentiID</th>
                        <th>Studenti</th>
                        <th>Lenda</th>
                        <th>Nota</th>
                        <th>Options</th>
                    </tr>
                    {vleresimet.filter(vleresimi => vleresimi.Lenda == Lenda).map(vleresimi=>
                        <tr>
                            <td>{vleresimi.Studenti}</td>
                            <td>{this.selectStudenti(studentet, vleresimi.Studenti)}</td>
                            <td>{this.selectLenda(lendet,vleresimi.Lenda)}</td>
                            <td>{vleresimi.Nota}</td>
                            <button type="button" onClick={()=>this.editClick(vleresimi)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(vleresimi.Studenti,vleresimi.Lenda)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <div id={stylist.formVleresimi}>
                        <h2>Vleresimi</h2>
                        {VleresimiStatus==0?
                        <div id={stylist.studentiInputDiv}>
                            <select onChange={this.changeStudenti} value={Studenti}>
                                <option value="0">Studenti</option>
                                       {studentetFilter.map(studenti =>
                                       <option value={studenti.StudentiID}>{studenti.Emri}</option>
                                       )
                           }
                            </select>
                        </div>:null}
                        <div id={stylist.notaInputDiv}>
                            <select onChange={this.changeNota} vlaue={Nota}>
                                <option value="99">Nota</option>
                                <option value="10">10</option>
                                <option value="9">9</option>
                                <option value="8">8</option>
                                <option value="7">7</option>
                                <option value="6">6</option>
                                <option value="5">5</option>
                                <option value="0">0</option>
                            </select>
                        </div>
                    </div>
                    {VleresimiStatus == 0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {VleresimiStatus != 0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>
        )
    }
}
export default Vleresimi
