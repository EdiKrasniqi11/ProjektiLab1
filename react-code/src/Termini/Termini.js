import React,{Component} from 'react'
import stylist from './Termini.module.css'
import variables from '../Variables'
import Modal from '../AnyUseComponents/Modal'

export class Termini extends Component{
    constructor(props){
        super(props)
        this.state ={
            terminet: [],
            studentet: [],
            Studenti: 0,
            Orari:"",
            TerminiStatus: 0,
            insertModal: false,
        }
    }
    refreshList(){
        fetch(variables.API_URL+'termini').then(response => response.json())
        .then(data=>{this.setState({terminet: data})})

        fetch(variables.API_URL+'studenti').then(response => response.json())
        .then(data=>{this.setState({studentet: data})})
        
    }
    componentDidMount(){
        this.refreshList()
    }
    changeStudenti = (e) =>{
        this.setState({Studenti: e.target.value})
    }
    changeOrari = (e) =>{
        this.setState({Orari: e.target.value})
    }
    
    createClick(){
        fetch(variables.API_URL+'termini',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Studenti:this.state.Studenti,
                Orari:this.state.Orari
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
        fetch(variables.API_URL+'termini',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Studenti:this.state.Studenti,
                Orari:this.state.Orari,
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
    deleteClick(studenti){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'termini/'+studenti,{
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
    editClick(termini){
        this.setState({
            Studenti:termini.Studenti,
            Terminet:termini.Terminet,
            insertModal:true,
            TerminiStatus:1
            
        })
    }
    addClick(){
        this.setState({
            Studenti:0,
            Terminet:"",
            TerminiStatus:0,
            insertModal:true
        })
    }
    selectStudenti(studentet, id){
        for(let i=0;i<studentet.length;i++){
            if(studentet[i].StudentiID === id){
                return studentet[i].Emri;
            }
        }
    }
    
    render(){
        const{
            terminet,
            studentet,
            Studenti,
            Orari,
            TerminiStatus,
            insertModal
        }=this.state
        return(
            <div className={stylist.terminiDiv}>
                <div id={stylist.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
                </div>
                <table>
                    <tr>
                        <th>StudentiID</th>
                        <th>Studenti</th>
                        <th>Termini</th>
                        <th>Options</th>
                    </tr>
                    {terminet.map(termini=>
                        <tr>
                            <td>{termini.Studenti}</td>
                            <td>{this.selectStudenti(studentet, termini.Studenti)}</td>
                            <td>{termini.Orari}</td>
                            <button type="button" onClick={()=>this.editClick(termini)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(termini.Studenti)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <div id={stylist.formTerminet}>
                        <h2>Termini i Ligjeratave</h2>
                        {TerminiStatus == 0?
                            <div id={stylist.studentiInputDiv}>
                                <select onChange={this.changeStudenti} value={Studenti}>
                                    <option value="0">Studenti</option>
                                    {studentet.map(studenti =>
                                        <option value={studenti.StudentiID}>{studenti.Emri}</option>)
                                    }
                                </select>
                            </div>:null}
                            <div id={stylist.terminiInputDiv}>
                                <select onChange={this.changeOrari} value={Orari}>
                                    <option value="">Orari</option>
                                    <option value="Paradite">Paradite 09:00-16:00</option>
                                    <option value="Pasdite">Pasdite 16:00-20:00</option>
                                </select>
                            </div>
                        </div>
                    {TerminiStatus == 0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {TerminiStatus != 0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>
        )
    }
}
export default Termini
