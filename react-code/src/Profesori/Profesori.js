import React,{Component} from 'react'
import stylist from './Profesori.module.css'
import variables from '../Variables'
import Modal from '../AnyUseComponents/Modal'

export class Profesori extends Component{
    constructor(props){
        super(props);

        this.state = {
            profesoret:[],
            drejtimet:[],
            shtetet:[],
            qytetet:[],
            vendbanimet:[],
            ProfesoriID:0,
            Emri:"",
            Mbiemri:"",
            Dita:0,
            Muaji:0,
            Viti:0,
            Datelindja:"",
            Gjinia: '',
            GradaAkademike:"",
            Drejtimi:0,
            NrTelefonit:"",
            Email:"",
            Vendbanimi: 0,
            
            insertModal:false,
            dataModal:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'profesori').then(response=>response.json())
        .then(data=>{this.setState({profesoret:data});});

        fetch(variables.API_URL+'drejtimi').then(response=>response.json())
        .then(data=>{this.setState({drejtimet:data});});

        fetch(variables.API_URL+'qyteti').then(response=>response.json())
        .then(data=>{this.setState({qytetet:data}); this.setState({filterQyteti:data});});

        fetch(variables.API_URL+'shteti').then(response=>response.json())
        .then(data=>{this.setState({shtetet:data});});

        fetch(variables.API_URL+'vendbanimi').then(response=>response.json())
        .then(data=>{this.setState({vendbanimet:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmri = (e) =>{
        this.setState({Emri:e.target.value});
    }
    changeMbiemri = (e) =>{
        this.setState({Mbiemri:e.target.value});
    }
    changeDatelindja(){
        this.setState({Datelindja: "1"});
        console.log(this.state.Datelindja);
    }
    changeDita = (e) =>{
        this.setState({Dita:e.target.value});
    }
    changeMuaji = (e) =>{
        this.setState({Muaji:e.target.value});
    }
    changeViti = (e) =>{
        this.setState({Viti:e.target.value});
    }
    changeGjinia = (e) =>{
        this.setState({Gjinia:e.target.value});
    }
    changeGradaAkademike = (e) =>{
        this.setState({GradaAkademike:e.target.value});
    }
    changeDrejtimi = (e) =>{
        this.setState({Drejtimi:e.target.value});
    }
    changeNrTelefonit = (e) =>{
        this.setState({NrTelefonit:e.target.value});
    }
    changeEmail = (e) =>{
        this.setState({Email:e.target.value});
    }
    changeVendbanimi = (e) =>{
        this.setState({Vendbanimi:e.target.value});
    }
    
    createClick(){
        var emri = this.state.Emri+" "+this.state.Mbiemri;
        var ditelindja = this.state.Dita+"/"+this.state.Muaji+"/"+this.state.Viti

        fetch(variables.API_URL+'profesori',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:emri,
                Datelindja:ditelindja,
                Gjinia:this.state.Gjinia,
                GradaAkademike:this.state.GradaAkademike,
                Drejtimi:this.state.Drejtimi,
                NrTelefonit:this.state.NrTelefonit,
                Email:this.state.Email,
                Vendbanimi:this.state.Vendbanimi
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
        var emri = this.state.Emri+" "+this.state.Mbiemri;
        var ditelindja = this.state.Dita+"/"+this.state.Muaji+"/"+this.state.Viti
        fetch(variables.API_URL+'profesori',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProfesoriID:this.state.ProfesoriID,
                Emri:emri,
                Mbiemri:this.state.Mbiemri,
                Datelindja:ditelindja,
                Gjinia:this.state.Gjinia,
                GradaAkademike:this.state.GradaAkademike,
                Drejtimi:this.state.Drejtimi,
                NrTelefonit:this.state.NrTelefonit,
                Email:this.state.Email,
                Vendbanimi:this.state.Vendbanimi
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
            fetch(variables.API_URL+'profesori/'+id,{
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
    editClick(profesoret){
        this.setState({
            ProfesoriID:profesoret.ProfesoriID,
            Emri:profesoret.Emri,
            Mbiemri:profesoret.Mbiemri,
            Datelindja:profesoret.Datelindja,
            Gjinia:profesoret.Gjinia,
            GradaAkademike:profesoret.GradaAkademike,
            Drejtimi:profesoret.Drejtimi,
            NrTelefonit:profesoret.NrTelefonit,
            Email:profesoret.Email,
            Vendbanimi:profesoret.Vendbanimi,
            insertModal:true
        });
    }
    addClick() {
        this.setState({
            ProfesoriID:0,
            Emri:"",
            Mbiemri:"",
            Dita:0,
            Muaji:0,
            Viti:0,
            Datelindja:"",
            Gjinia: '',
            GradaAkademike:"",
            Drejtimi:0,
            NrTelefonit:"",
            Email:"",
            Vendbanimi: 0,
            insertModal:true
        });
    }
    formatDate(date){
        let dateArray = date.split("T")
        let dateComponents = dateArray[0].split("-")
        var dateString = dateComponents[2]+'/'+dateComponents[1]+'/'+dateComponents[0];
        return dateString
    }
    render(){
        const{
            profesoret,
            drejtimet,
            shtetet,
            qytetet,
            vendbanimet,
            ProfesoriID,
            Emri,
            Mbiemri,
            Dita,
            Muaji,
            Viti,
            Datelindja,
            Gjinia,
            GradaAkademike,
            Drejtimi,
            NrTelefonit,
            Email,
            Vendbanimi,
            insertModal,
            dataModal
        }=this.state;
        let years=[];
        for(let i=2022;i>1957;i--){
            years.push(<option value={i}>{i}</option>);
        }
        let days=[];
        for(let i=1;i<30;i++){
            days.push(<option value={i}>{i}</option>)
        }
        return(
            <div className={stylist.profesoriDiv}>
                <button type="button" onClick={() => this.addClick()} id={stylist.addButton}>Shto Profesorin</button>
                <table>
                    <tr>
                        <th>ProfesoriID</th>
                        <th>Emri</th>
                        <th>Datelindja</th>
                        <th>Tjera</th>
                        <th>Options</th>
                    </tr>
                    {profesoret.map(profesoret=>
                        <tr key={profesoret.ProfesoriID}>
                            <td>{profesoret.ProfesoriID}</td>
                            <td>{profesoret.Emri}</td>
                            <td>{this.formatDate(profesoret.Datelindja)}</td>
                            <td id={stylist.extraButton}>...</td>
                            <td>
                            <button type="button" onClick={()=>this.editClick(profesoret)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button type="button" onClick={()=>this.deleteClick(profesoret.ProfesoriID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                            </td>
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <div id={stylist.inputDiv}>
                        <h2>Profesori</h2>
                        <div id={stylist.emriInputDiv}>
                            <input type="text" value={Emri} onChange={this.changeEmri} placeholder="Emri"/>
                        </div>

                        <div id={stylist.mbiemriInputDiv}>
                            <input type="text" value={Mbiemri} onChange={this.changeMbiemri} placeholder="Mbiemri"/>
                        </div>
zz
                        <div id={stylist.date}>
                            <select id="dayInput" onChange={this.changeDita} value={Dita}>
                                <option value="0">Dita</option>
                                {days}
                            </select>
                            <select id="monthInput" onChange={this.changeMuaji} value={Muaji}>
                                <option value="0">Muaji</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select id="yearInput" onChange={this.changeViti} value={Viti}>
                                <option value="0">Viti</option>
                                {years}
                            </select>
                        </div>
                        <div id={stylist.gjiniaInputDiv}>
                            <select onChange={this.changeGjinia} value={Gjinia}>
                                <option value="0">Gjinia</option>
                                <option value="M">Mashkull</option>
                                <option value="F">Femer</option>
                            </select>
                        </div>

                        <div id={stylist.gradaInputDiv}>
                            <select onChange={this.changeGradaAkademike} value={GradaAkademike}>
                                <option value="0">GradaAkademike</option>
                                <option value="Bsc">Bsc</option>
                                <option value="Msc">Msc</option>
                                <option value="Phd">Phd</option>
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
                            
                        <div id={stylist.nrTelefonitInputDiv}>
                            <input type="text" value={NrTelefonit} onChange={this.changeNrTelefonit} placeholder="NrTelefonit"/>
                        </div>

                        <div id={stylist.emailInputDiv}>
                            <input type="text" value={Email} onChange={this.changeEmail} placeholder="Email"/>
                        </div>
                        
                        <div id={stylist.vendbanimiInputDiv}>
                            <select onChange={this.changeVendbanimi} value={Vendbanimi}>
                                <option value="0">Vendbanimi</option>
                                {vendbanimet.map(vendbanimet =>
                                    <option value={vendbanimet.VendbanimiID}>{vendbanimet.Adresa}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                    {ProfesoriID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {ProfesoriID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
            </div>
        );
    }
}

export default Profesori