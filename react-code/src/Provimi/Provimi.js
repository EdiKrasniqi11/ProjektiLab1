import React,{Component} from 'react'
import stylist from './Provimi.module.css'
import variables from '../Variables'
import Modal from '../AnyUseComponents/Modal'

export class Provimi extends Component{
    constructor(props){
        super(props);

        this.state = {
	    provimet:[],
	    studentet:[],
	    filterProfesori:[],
        lendet:[],
        profesoret:[],
        ProvimiID:0,
	    Studenti:0,
	    Lenda:0,
        Profesori: 0,
	    insertModal:false,
        dataModal:false,

        }
    }
    refreshList(){
        fetch(variables.API_URL+'provimi').then(response=>response.json())
        .then(data=>{this.setState({provimet:data});});

        fetch(variables.API_URL+'profesori').then(response=>response.json())
        .then(data=>{this.setState({profesoret:data}); this.setState({filterProfesori:data});});

        fetch(variables.API_URL+'studenti').then(response=>response.json())
        .then(data=>{this.setState({studentet:data});});

	fetch(variables.API_URL+'lenda').then(response=>response.json())
        .then(data=>{this.setState({lendet:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeProfesori = (e) =>{
        this.setState({Profesori:e.target.value});
    }
    changeStudenti = (e) =>{
        this.setState({Studenti:e.target.value});
    }
    changeLenda = (e) =>{
        this.setState({Lenda:e.target.value});

        var profesori = this.state.lendet.find(element=> element.LendaID==e.target.value).Profesori;
        var selProfesori = this.state.profesoret.filter(item => item.ProfesoriID == profesori)
        this.setState({filterProfesori: selProfesori})
    }
    createClick(){
        fetch(variables.API_URL+'provimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Profesori:this.state.Profesori,
		        Lenda:this.state.Lenda,
		        Studenti:this.state.Studenti,
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
        fetch(variables.API_URL+'provimi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProvimiID:this.state.ProvimiID,
		Studenti:this.state.Studenti,
		Lenda:this.state.Lenda,
		Profesori:this.state.Profesori,
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
            fetch(variables.API_URL+'provimi/'+id,{
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
    editClick(provimet){
        this.setState({
        ProvimiID:provimet.ProvimiID,
	    Studenti:provimet.Studenti,
	    Lenda:provimet.Lenda,
	    Profesori:provimet.Profesori,
        insertModal:true
        });
    }
 selectProfesori(profesoret, id){
        for(let i=0;i<profesoret.length;i++){
            if(profesoret[i].ProfesoriID === id){
                return profesoret[i].Emri;
            }
        }
    }
selectLenda(lendet, id){
        for(let i=0;i<lendet.length;i++){
            if(lendet[i].LendaID === id){
                return lendet[i].Emri;
            }
        }
    }
selectStudenti(studentet, id){
        for(let i=0;i<studentet.length;i++){
            if(studentet[i].StudentiID === id){
                return studentet[i].Emri;
            }
        }
    }
    addClick() {
        this.setState({
            ProvimiID:0,
	    Studenti:0,
	    Lenda:0,
	    Profesori:0,
            insertModal:true
        });
    }
    
    render(){
        const{
            provimet,
	        studentet,
	        lendet,
            profesoret,
	        filterProfesori,
	        ProvimiID,
	        Studenti,
            Lenda,
	        Profesori,
            insertModal,
            dataModal
        }=this.state;

        return(
            <div className={stylist.provimiDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Paraqitjen</button>
                <table>
                    <tr>
                        <th>ProvimiID</th>
			            <th>Studenti</th>
			            <th>Lenda</th>
			            <th>Profesori</th>
                        <th>Options</th>
                    </tr>
                    {provimet.map(provimet=>
                        <tr key={provimet.ProvimiID}>
                            <td>{provimet.ProvimiID}</td>
			    <td>{this.selectStudenti(studentet, provimet.Studenti)}</td>
			    <td>{this.selectLenda(lendet, provimet.Lenda)}</td>
			    <td>{this.selectProfesori(profesoret, provimet.Profesori)}</td>
                            <button type="button" onClick={()=>this.editClick(provimet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(provimet.ProvimiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                            
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <div id={stylist.formProvimi}>
                        <h2>Studenti</h2>
                        <div id={stylist.StudentiInputDiv}>
                            <select onChange={this.changeStudenti} value={Studenti}>
                                <option value="0">Studenti</option>
                                       {studentet.map(studentet =>
                                    <option value={studentet.StudentiID}>{studentet.Emri}</option>
                           )}
                            </select>
                        </div>

                        
  <div id={stylist.LendaInputDiv}>
                            <select onChange={this.changeLenda} value={Lenda}>
                                <option value="0">Lenda</option>
                                       {lendet.map(lendet =>
                                    <option value={lendet.LendaID}>{lendet.Emri}</option>
                           )}
                            </select>
                        </div>
 <div id={stylist.ProfesoriInputDiv}>
                            <select onChange={this.changeProfesori} value={Profesori}>
                                <option value="0">Profesori</option>
                                       {filterProfesori.map(profesoret =>
                                    <option value={profesoret.ProfesoriID}>{profesoret.Emri}</option>
                           )}
                            </select>
                        </div>
                    </div>
                    {ProvimiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {ProvimiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>
        );
    }
}

export default Provimi