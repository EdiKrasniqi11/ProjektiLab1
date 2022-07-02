import React,{Component} from 'react'
import stylist from './Waitlist.module.css'
import variables from '../Variables'
import Modal from '../../AnyUseComponents/Modal'
import StudentData from '../../AnyUseComponents/StudentData'

export class Waitlist extends Component{
    constructor(props){
        super(props);

        this.state = {
            waitlista:[],
            fakultetet:[],
            fakultetetFilter:[],
            deget:[],
            degetFilter:[],
            drejtimet:[],
            drejtimetFilter:[],
            specializimet:[],
            specializimetFilter:[],
            shtetet:[],
            qytetet:[],
            qytetetFilter:[],
            vendbanimet:[],
            vendbanimetFilter:[],
            StudentiID:0,
            Emri:"",
            Email:"",
            Password:"",
            Mbiemri:"",
            Dita:0,
            Muaji:0,
            Viti:0,
            Gjinia: '',
            Shteti:0,
            Qyteti:0,
            Vendbanimi: 0,
            Fakulteti:0,
            Dega:0,
            Drejtimi:0,
            Specializimi:0,
            insertModal:false,
            dataModal:false,
            passwordShown:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'waitlist').then(response=>response.json())
        .then(data=>{this.setState({waitlista:data});});

        fetch(variables.API_URL+'fakulteti').then(response=>response.json())
        .then(data=>{this.setState({fakultetet:data}); this.setState({fakultetetFilter:data});});

        fetch(variables.API_URL+'dega').then(response=>response.json())
        .then(data=>{this.setState({deget:data}); this.setState({degetFilter:data});});

        fetch(variables.API_URL+'drejtimi').then(response=>response.json())
        .then(data=>{this.setState({drejtimet:data}); this.setState({drejtimetFilter:data});});

        fetch(variables.API_URL+'specializimi').then(response=>response.json())
        .then(data=>{this.setState({specializimet:data}); this.setState({specializimetFilter:data});});

        fetch(variables.API_URL+'qyteti').then(response=>response.json())
        .then(data=>{this.setState({qytetet:data}); this.setState({qytetetFilter:data});});

        fetch(variables.API_URL+'shteti').then(response=>response.json())
        .then(data=>{this.setState({shtetet:data});});

        fetch(variables.API_URL+'vendbanimi').then(response=>response.json())
        .then(data=>{this.setState({vendbanimet:data}); this.setState({vendbanimetFilter:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmri = (e) =>{
        this.setState({Emri:e.target.value});
    }
    changeEmail = (e) =>{
        this.setState({Email:e.target.value});
    }
    changePassword = (e) =>{
        this.setState({Password:e.target.value});
    }
    changeMbiemri= (e) =>{
        this.setState({Mbiemri:e.target.value});
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
    changeShteti = (e) =>{
        this.setState({Shteti:e.target.value});
        

        var selFakulteti = this.state.fakultetet.filter(fakulteti => fakulteti.Shteti == e.target.value);
        var selQyteti = this.state.qytetet.filter(qyteti => qyteti.Shteti == e.target.value);
        this.setState({fakultetetFilter: selFakulteti});
        this.setState({qytetetFilter: selQyteti});
    }
    changeQyteti = (e) =>{
        this.setState({Qyteti: e.target.value});

        var selVendbanimi = this.state.vendbanimet.filter(vendbanimi => vendbanimi.Qyteti == e.target.value);
        this.setState({vendbanimetFilter: selVendbanimi})
    }
    changeVendbanimi = (e) =>{
        this.setState({Vendbanimi:e.target.value});
    }
    changeFakulteti = (e) =>{
        this.setState({Fakulteti:e.target.value});

        var selDega = this.state.deget.filter(dega => dega.Fakulteti == e.target.value);
        var selDrejtimi = this.state.drejtimet.filter(drejtimi => drejtimi.Fakulteti == e.target.value);
        this.setState({degetFilter: selDega});
        this.setState({drejtimetFilter: selDrejtimi});
    }
    changeDega = (e) =>{
        this.setState({Dega:e.target.value});
    }
    changeDrejtimi = (e) =>{
        this.setState({Drejtimi:e.target.value});

        var selSpecializimi = this.state.specializimet.filter(specializimi => specializimi.Drejtimi == e.target.value && specializimi.Fakulteti == this.state.Fakulteti);
        this.setState({specializimetFilter: selSpecializimi});
    }
    changeSpecializimi = (e) =>{
        this.setState({Specializimi:e.target.value});
    }
    createClick(){
        var emri = this.state.Emri+" "+this.state.Mbiemri;
        var ditelindja = this.state.Dita+"/"+this.state.Muaji+"/"+this.state.Viti;
        fetch(variables.API_URL+'waitlist',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:emri,
                Email:this.state.Email,
                Password:this.state.Password,
                Datelindja:ditelindja,
                Gjinia:this.state.Gjinia,
                Vendbanimi:this.state.Vendbanimi,
                Fakulteti:this.state.Fakulteti,
                Dega:this.state.Dega,
                Drejtimi:this.state.Drejtimi,
                Specializimi:this.state.Specializimi
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            })
        this.setState({
            insertModal:false,
            passwordShown:false
        })
    }
    updateClick(){
        var emri = this.state.Emri+" "+this.state.Mbiemri;
        var ditelindja = this.state.Dita+"/"+this.state.Muaji+"/"+this.state.Viti;
        if(!this.state.Email.endsWith('@ubt-uni.net')){
            return alert("Email must end in @ubt-uni.net");
        }else{
            fetch(variables.API_URL+'waitlist',{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    StudentiID:this.state.StudentiID,
                    Emri:emri,
                    Email:this.state.Email,
                    Password:this.state.Password,
                    Datelindja:ditelindja,
                    Gjinia:this.state.Gjinia,
                    Vendbanimi:this.state.Vendbanimi,
                    Fakulteti:this.state.Fakulteti,
                    Dega:this.state.Dega,
                    Drejtimi:this.state.Drejtimi,
                    Specializimi:this.state.Specializimi
                })
            }).then(res=>res.json())
            .then((result)=>{
                    alert(result);
                    this.refreshList();
                })
            this.setState({
                insertModal:false,
                passwordShown:false
            })
        }
    }
    acceptClick(waitlista){
        if(window.confirm("Are you sure?")){
            fetch(variables.API_URL+'studenti',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Emri:waitlista.Emri,
                    Email:waitlista.Email,
                    Password:waitlista.Password,
                    Datelindja:waitlista.Datelindja,
                    Gjinia:waitlista.Gjinia,
                    Vendbanimi:waitlista.Vendbanimi,
                    Fakulteti:waitlista.Fakulteti,
                    Dega:waitlista.Dega,
                    Drejtimi:waitlista.Drejtimi,
                    Specializimi:waitlista.Specializimi
                })
            })
                .then(res=>res.json())
                .then((result)=>{
                    alert(result);
                    this.refreshList();
                })
            this.setState({
                insertModal:false,
                passwordShown:false
            })
            fetch(variables.API_URL+'waitlist/'+waitlista.StudentiID,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(res=>res.json())
            .then((result)=>{
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'waitlist/'+id,{
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
    editClick(waitlista){
        let fullname = waitlista.Emri.split(" ");
        let emri = fullname[0];
        let mbiemri = fullname[1];
        this.setState({
            StudentiID:waitlista.StudentiID,
            Emri:emri,
            Mbiemri:mbiemri,
            Email:waitlista.Email,
            Password:waitlista.Password,
            Datelindja:waitlista.Datelindja,
            Gjinia:waitlista.Gjinia,
            Shteti:0,
            Qyteti:0,
            Vendbanimi:waitlista.Vendbanimi,
            Fakulteti:waitlista.Fakulteti,
            Dega:waitlista.Dega,
            Drejtimi:waitlista.Drejtimi,
            Specializimi:waitlista.Specializimi,
            insertModal:true
        });
    }
    addClick() {
        this.setState({
            StudentiID:0,
            Emri:"",
            Mbiemri:"",
            Email:"",
            Password:"",
            Dita:0,
            Muaji:0,
            Viti:0,
            Datelindja:"",
            Gjinia: '',
            Shteti:0,
            Qyteti:0,
            Vendbanimi: 0,
            Fakulteti:0,
            Dega:0,
            Drejtimi:0,
            Specializimi:0,
            insertModal:true,
            passwordShown:false
        });
    }
    viewData(studentet){
        let fullname = studentet.Emri.split(" ");
        let emri = fullname[0];
        let mbiemri = fullname[1];
        let shteti = this.state.vendbanimet.find(element => element.VendbanimiID == studentet.Vendbanimi).Shteti;
        let qyteti = this.state.vendbanimet.find(element => element.VendbanimiID == studentet.Vendbanimi).Shteti;
        this.setState({
            StudentiID:studentet.StudentiID,
            Emri:emri,
            Mbiemri:mbiemri,
            Email:studentet.Email,
            Password:studentet.Password,
            Datelindja:studentet.Datelindja,
            Gjinia:studentet.Gjinia,
            Shteti:shteti,
            Qyteti:qyteti,
            Vendbanimi:studentet.Vendbanimi,
            Fakulteti:studentet.Fakulteti,
            Dega:studentet.Dega,
            Drejtimi:studentet.Drejtimi,
            Specializimi:studentet.Specializimi,
            dataModal:true
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
            waitlista,
            fakultetet,
            fakultetetFilter,
            deget,
            degetFilter,
            drejtimet,
            drejtimetFilter,
            specializimet,
            specializimetFilter,
            shtetet,
            qytetet,
            qytetetFilter,
            vendbanimet,
            vendbanimetFilter,
            StudentiID,
            Emri,
            Mbiemri,
            Email,
            Password,
            Dita,
            Muaji,
            Viti,
            Gjinia,
            Shteti,
            Qyteti,
            Vendbanimi,
            Fakulteti,
            Dega,
            Drejtimi,
            Specializimi,
            insertModal,
            dataModal,
            passwordShown
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
            <div className={stylist.studentiDiv}>
                <div id={stylist.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
                </div>
                <table>
                    <tr>
                        <th>StudentID</th>
                        <th>Emri</th>
                        <th>Datelindja</th>
                        <th>Options</th>
                    </tr>
                    {waitlista.map(waitlista=>
                        <tr key={waitlista.StudentiID}>
                            <td>{waitlista.StudentiID}</td>
                            <td>{waitlista.Emri}</td>
                            <td>{this.formatDate(waitlista.Datelindja)}</td>
                            <td>
                            <button title="View Student Data" type="button" onClick={()=>this.viewData(waitlista)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg></button>
                            <button title="Edit Student Data" type="button" onClick={()=>this.editClick(waitlista)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                            <button title="Accept" type="button" onClick={()=>this.acceptClick(waitlista)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                            </svg></button>
                            <button title="Deny" type="button" onClick={()=>this.deleteClick(waitlista.StudentiID)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                            </svg></button>
                            </td>
                        </tr>
                        )}
                </table>
                {insertModal && <Modal modalSwitch={()=>this.setState({insertModal:false})}>
                    <div id={stylist.inputDiv}>
                        <h2>Studenti</h2>
                        <div id={stylist.emriInputDiv}>
                            <input type="text" value={Emri} onChange={this.changeEmri} placeholder="Emri"/>
                            <input type="text" value={Mbiemri} onChange={this.changeMbiemri} placeholder="Mbiemri"/>
                        </div>
                        <div id={stylist.emailInputDiv}>
                            <input type="text" value={Email} onChange={this.changeEmail} placeholder="Email"/>
                        </div>
                        <div id={stylist.passwordInputDiv}>
                            <input type={passwordShown? "text" : "password"} value={Password} onChange={this.changePassword} placeholder="Password" id="passwordID"/><svg id={stylist.showPassword} onClick={() => {if(this.state.passwordShown){this.setState({passwordShown: false})}else{this.setState({passwordShown: true})}}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16  "><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>
                        </div>
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
                        <div id={stylist.shtetiInputDiv}>
                            <select onChange={this.changeShteti} value={Shteti}>
                                <option value="0">Shteti</option>
                                {shtetet.map(shteti=>
                                    <option value={shteti.ShtetiID}>{shteti.Emri}</option>
                                    )}
                            </select>
                            <select onChange={this.changeQyteti} value={Qyteti}>
                                <option value="0">Qyteti</option>
                                {qytetetFilter.map(qyteti=>
                                    <option value={qyteti.QytetiID}>{qyteti.Emri}</option>
                                    )}
                            </select>
                        </div>
                        <div id={stylist.vendbanimiInputDiv}>
                            <select onChange={this.changeVendbanimi} value={Vendbanimi}>
                                <option value="0">Vendbanimi</option>
                                {vendbanimetFilter.map(vendbanimet =>
                                    <option value={vendbanimet.VendbanimiID}>{vendbanimet.Adresa}</option>
                                    )}
                            </select>
                        </div>
                        <div id={stylist.vendbanimiInputDiv}>
                            <select onChange={this.changeFakulteti} value={Fakulteti}>
                                <option value="0">Fakulteti</option>
                                {fakultetetFilter.map(fakulteti =>
                                    <option value={fakulteti.FakultetiID}>{fakulteti.Emri}</option>
                                    )}
                            </select>
                        </div>
                        <div id={stylist.degaInputDiv}>
                            <select onChange={this.changeDega} value={Dega}>
                                <option value="0">Dega</option>
                                {degetFilter.map(deget =>
                                    <option value={deget.DegaID}>{qytetet.find(qyteti => qyteti.QytetiID===deget.Qyteti).Emri}</option>
                                    )}
                            </select>
                        </div>
                        <div id={stylist.drejtimiInputDiv}>
                            <select onChange={this.changeDrejtimi} value={Drejtimi}>
                                <option value="0">Drejtimi</option>
                                {drejtimetFilter.map(drejtimet =>
                                    <option value={drejtimet.DrejtimiID}>{drejtimet.Emri}</option>
                                    )}
                            </select>
                        </div>
                        <div id={stylist.specializimiInputDiv}>
                            <select onChange={this.changeSpecializimi} value={Specializimi}>
                                <option value="0">Specializimi</option>
                                {specializimetFilter.map(specializimi =>
                                    <option value={specializimi.SpecializimiID}>{specializimi.EmriSpecializimit}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                    {StudentiID ==0?
                    <button type="button" onClick={()=>this.createClick()}>Create</button>
                    :null}
                    {StudentiID !=0?
                    <button type="button" onClick={()=>this.updateClick()}>Update</button>
                    :null}
                </Modal>}
                {dataModal?<StudentData modalSwitch={()=>this.setState({dataModal:false})}>
                    <p>{this.state.StudentiID}</p>
                    <p>{this.state.Emri} {this.state.Mbiemri}</p>
                    <p>{this.state.Email}</p>
                    <p>{this.state.Password}</p>
                    <p>{this.formatDate(this.state.Datelindja)}</p>
                    <p>{this.state.Gjinia}</p>
                    <p>{this.state.shtetet.find(element => element.ShtetiID == Shteti).Emri}, {this.state.qytetet.find(element => element.QytetiID == Qyteti).Emri}, {this.state.vendbanimet.find(element => element.VendbanimiID == Vendbanimi).Adresa}</p>
                    <p>{this.state.fakultetet.find(element => element.FakultetiID == Fakulteti).Emri}</p>
                    <p>{this.state.qytetet.find(element => element.QytetiID == this.state.deget.find(element => element.DegaID == Dega).Qyteti).Emri}</p>
                    <p>{this.state.drejtimet.find(element => element.DrejtimiID == Drejtimi).Emri}</p>
                    <p>{this.state.specializimet.find(element => element.SpecializimiID == Specializimi).EmriSpecializimit}</p>
                </StudentData>:null}
            </div>
        );
    }
}

export default Waitlist