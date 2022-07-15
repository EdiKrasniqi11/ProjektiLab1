import react,{Component} from 'react'
import stylist from './MySchedule.module.css'
import variables from '../../../CRUDs/Variables'
import secureLocalStorage from 'react-secure-storage';

export default class MySchedule extends Component{
    constructor(props){
        super(props);
        this.state={
            terminet: [],
            Studenti: JSON.parse(secureLocalStorage.getItem("user")).StudentiID,
            Orari: ""
        }
    }
    refreshList(){
        fetch(variables.API_URL+'termini').then(response => response.json())
        .then(data=>{this.setState({terminet: data})})
    }
    componentDidMount(){
        this.refreshList();
    }
    changeOrari = (e) =>{
        console.log(e.target.value);
        this.setState({Orari: e.target.value})
    }
    kaCaktuar(terminet){
        return terminet.find(termini => termini.Studenti == this.state.Studenti)
    }
    createClick(){
        console.log(this.state.Orari)
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
                alert("Orari eshte Selektuar me Sukses: "+this.state.Orari);
                this.refreshList();
            })
    }
    deleteClick(studenti){
        fetch(variables.API_URL+'termini/'+studenti,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then((result)=>{
            alert("Orari eshte Anuluar me Sukses");
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    render(){
        const{
            terminet,
            Studenti,
            Orari
        }=this.state;
        return(
            <div className={stylist.myScheduleDiv}>
                {this.kaCaktuar(terminet)!=null?
                <div id={stylist.ekzistonDiv}>
                    <h1>Ju keni caktuar terminin {this.kaCaktuar(terminet)?.Orari}</h1>
                    <p>Per te anuluar apo ndryshuar terminin e ligjeratave klikoni butonin</p>
                    <button onClick={() => this.deleteClick(Studenti)}>Kliko per te Anuluar</button>
                </div>
                :
                <div id={stylist.ekzistonDiv}>
                    <h1>Cakto Terminin e Ligjeratave</h1>
                    <p>Selektoni njerin nder oraret meposhte</p>
                    <select onChange={this.changeOrari} value={Orari}>
                        <option value="">Orari</option>
                        <option value="Paradite">Paradite 09:00-16:00</option>
                        <option value="Pasdite">Pasdite 16:00-20:00</option>
                    </select>
                    <button onClick={() => this.createClick()}>Cakto Orarin</button>
                </div>}
            </div>
        )
    }
}