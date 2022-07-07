import react,{Component} from 'react'
import stylist from './MyTranscript.module.css'
import variables from '../../../CRUDs/Variables'

export default class MyTranscript extends Component{
    constructor(props){
        super(props)
        this.state = {
            vleresimet: [],
            lendet: [],
        }
    }
    refreshList(){
        fetch(variables.API_URL+'vleresimi').then(response => response.json())
        .then(data=>{this.setState({vleresimet:data})})

        fetch(variables.API_URL+'lenda').then(response => response.json())
        .then(data=>{this.setState({lendet: data})})
    }
    componentDidMount(){
        this.refreshList();
    }
    selectGrades(studenti){
        var transkripta = this.state.vleresimet.filter(element => element.Studenti == studenti)
        return transkripta
    }
    selectLenda(lendet, id){
        for(let i=0;i<lendet.length;i++){
            if(lendet[i].LendaID == id){
                return lendet[i].Emri
            }
        }
    }
    selectECTS(lendet, id){
        for(let i=0;i<lendet.length;i++){
            if(lendet[i].LendaID == id){
                return lendet[i].ECTS
            }
        }
    }
    render(){
        const{
            vleresimet,
            lendet
        }=this.state
        const studenti = JSON.parse(localStorage.getItem("user"));
        var index = 0
        var ectsTotal = 0
        var gradesTotal = 0
        return(
            <div class={stylist.myTranscriptDiv}>
                <table>
                    <tr>
                        <th>#</th>
                        <th>LendaID</th>
                        <th>Lenda</th>
                        <th>ECTS</th>
                        <th>Nota</th>
                    </tr>
                    {this.selectGrades(studenti.StudentiID).map((nota) =>{
                        ectsTotal += parseFloat(this.selectECTS(lendet, nota.Lenda))
                        gradesTotal += nota.Nota
                        return (<tr>
                            <td>{index+=1}</td>
                            <td>{nota.Lenda}</td>
                            <td>{this.selectLenda(lendet, nota.Lenda)}</td>
                            <td>{this.selectECTS(lendet, nota.Lenda)}</td>
                            <td>{nota.Nota}</td>
                        </tr>)
                        }
                    )}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{ectsTotal}</td>
                        <td>{gradesTotal/index}</td>
                    </tr>
                </table>
            </div>
        )
    }
}