import React,{Component} from 'react'
import stylist from './Waitlist.module.css'
import variables from '../Variables'
import Modal from '../AnyUseComponents/Modal'

export class Waitlist extends Component{
    constructor(props){
        super(props);

        this.state = {
	    waitlistet:[],
	    studentet:[],
	    Studenti:0,
        StudentiStatus:0,
	    insertModal:false,
        dataModal:false,

        }
    }
    refreshList(){
        fetch(variables.API_URL+'waitlist').then(response=>response.json())
        .then(data=>{this.setState({waitlistet:data});});

        fetch(variables.API_URL+'studenti').then(response=>response.json())
        .then(data=>{this.setState({studentet:data});});
    }

    componentDidMount(){
        this.refreshList();
    }
    changeStudenti = (e) =>{
        this.setState({Studenti:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'waitlist',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
		        Studenti:this.state.Studenti
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
        fetch(variables.API_URL+'waitlist',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
		        Studenti:this.state.Studenti
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
            fetch(variables.API_URL+'provimi/'+studenti,{
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
    editClick(waitlistet){
        this.setState({
            studentiStatus:1,
	        Studenti:waitlistet.Studenti,
            insertModal:true
        });
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
            StudentiStatus:0,
	        Studenti:0,
            insertModal:true
        });
    }
    
    render(){
        const{
            waitlistet,
	        studentet,
	        Studenti,
            StudentiStatus,
            insertModal,
            dataModal
        }=this.state;

        return(
            <div className={stylist.waitlistDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Paraqitjen</button>
                <table>
                    <tr>
			            <th>Studenti</th>
                        <th>Options</th>
                    </tr>
                    {waitlistet.map(waitlistet=>
                            <tr>
			                <td>{this.selectStudenti(studentet, waitlistet.Studenti)}</td>
                            <button type="button" onClick={()=>this.editClick(waitlistet)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(waitlistet.Studenti)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                            
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
               
                    <div id={stylist.formWaitlist}>
                        <h2>Waitlist</h2> 
                        {StudentiStatus==0?
                        <div id={stylist.StudentiInputDiv}>
                            <select onChange={this.changeStudenti} value={Studenti}>
                                <option value="0">Studenti</option>
                                       {studentet.map(studentet =>
                                    <option value={studentet.StudentiID}>{studentet.Emri}</option>
                           )}
                            </select>
                        </div>:null}
                    </div>
                    {StudentiStatus == 0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {StudentiStatus != 0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>
        );
    }
}

export default Waitlist