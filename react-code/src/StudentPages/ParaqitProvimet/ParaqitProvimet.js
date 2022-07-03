import react,{Component} from 'react'
import stylist from './ParaqitProvimet.module.css'
import variables from '../../CRUDs/Variables'

export default class ParaqitProvimet extends Component{
    constructor(props){
        super(props)
        this.state = {
            provimet: [],
            lendet: [],
            filterLendet:[],
            profesoret: [],
            vleresimet: [],
            Studenti: JSON.parse(localStorage.getItem("user")),
            Lenda: 0,
            Profesori: 0
        }
    }
    refreshList(){
        fetch(variables.API_URL+'provimi').then(response=>response.json())
        .then(data=>{this.setState({provimet:data});});

        fetch(variables.API_URL+'profesori').then(response=>response.json())
        .then(data=>{this.setState({profesoret:data})});

	    fetch(variables.API_URL+'lenda').then(response=>response.json())
        .then(data=>{this.setState({lendet:data})});

        fetch(variables.API_URL+'vleresimi').then(response => response.json())
        .then(data=>{this.setState({vleresimet: data})})
    }
    componentDidMount(){
        this.refreshList();
    }
    changeProfesori = (e) =>{
        this.setState({Profesori:e.target.value});
    }
    changeLenda = (e) =>{
        this.setState({Lenda:e.target.value});

        var profesori = this.state.lendet.find(element=> element.LendaID==e.target.value).Profesori;
        var selProfesori = this.state.profesoret.filter(item => item.ProfesoriID == profesori)
        this.setState({filterProfesori: selProfesori})
    }
    createClick(lenda){
        fetch(variables.API_URL+'provimi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Profesori:lenda.Profesori,
		        Lenda:lenda.LendaID,
		        Studenti:this.state.Studenti.StudentiID
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert("Provimi eshte Paraqitur");
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
    }
    deleteClick(lenda){
        fetch(variables.API_URL+'provimi/'+this.state.Studenti.StudentiID+'/'+lenda,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then((result)=>{
            alert("Paraqitja eshte Anuluar");
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    editClick(provimet){
        this.setState({
	        Lenda:provimet.Lenda,
	        Profesori:provimet.Profesori,
        });
    }
    selectECTS(lendet, id){
        for(let i=0;i<lendet.length;i++){
            if(lendet[i].LendaID == id){
                return lendet[i].ECTS
            }
        }
    }
    kaParaqitur(provimet, lenda){
        return provimet.find(provimi => provimi.Lenda == lenda && provimi.Studenti == this.state.Studenti.StudentiID)!=null
    }
    eshteVleresuar(vleresimet, lenda){
        return vleresimet.find(vleresimi => vleresimi.Lenda == lenda && vleresimi.Studenti == this.state.Studenti.StudentiID)!=null
    }
    render(){
        const{
            provimet,
            lendet,
            profesoret,
            vleresimet,
            Studenti,
            Lenda,
            Profesori
        }=this.state
        return(
            <div className={stylist.provimetDiv}>
                <table>
                    <tr>
                        <th>LendaID</th>
                        <th>Lenda</th>
                        <th>Profesori</th>
                        <th>ECTS</th>
                        <th>Paraqit</th>
                    </tr>
                    {lendet.filter(lenda => vleresimet.find(vleresimi => vleresimi.Lenda == lenda.LendaID && vleresimi.Studenti == Studenti.StudentiID)==null).map(lenda =>
                        <tr key={lenda.LendaID}>
                            <td>{lenda.LendaID}</td>
                            <td>{lenda.Emri}</td>
                            <td>{profesoret.find(profesori => profesori.ProfesoriID == lenda.Profesori)?.Emri}</td>
                            <td>{this.selectECTS(lendet, lenda.LendaID)}</td>
                            {this.kaParaqitur(provimet, lenda.LendaID)?
                            <td><button onClick={() => this.deleteClick(lenda.LendaID)}>Anulo Paraqitjen</button></td>:
                            <td><button onClick={() => this.createClick(lenda)}>Paraqit Provimin</button></td>}
                        </tr>    
                    )}
                </table>
            </div>
        )
    }
}