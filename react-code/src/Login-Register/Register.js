import react,{Component} from 'react';
import StudentData from '../AnyUseComponents/StudentData';
import variables from '../CRUDs/Variables';
import stylist from './Login.module.css';

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            studentet:[],
            profesoret:[],
            administratoret:[],
            waitlist:[],
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
        fetch(variables.API_URL+'studenti')
        .then(response=>response.json()).then(data=>{this.setState({studentet:data});});

        fetch(variables.API_URL+'profesori')
        .then(response=>response.json()).then(data=>{this.setState({profesoret:data});});

        fetch(variables.API_URL+'administrator')
        .then(response=>response.json()).then(data=>{this.setState({administratoret:data});});
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
        console.log(e.target.value)
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
    userExists(email){
        var user = this.state.studentet.find(studenti => studenti.Email == email);
        if(user == null){
            user = this.state.profesoret.find(profesori => profesori.Email == email);
            if(user == null){
                user = this.state.administratoret.find(admini => admini.Email == email);
                if(user == null){
                    this.createClick();
                    window.location.href = '../';
                }else{
                    alert('Email ekziston');
                }
            }else{
                alert('Email ekziston');
            }
        }else{
             alert('Email ekziston');
        }
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
            passwordShown:false
        })
    }
    render(){
        const{
            studentet,
            profesoret,
            administratoret,
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
        <div className={stylist.loginDiv}>
            <div id={stylist.registerForm}>
                <h2>REGISTER</h2>
                <div id={stylist.registerInputDiv}>
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
                        <div id={stylist.shtetiInputDiv}>
                            <select onChange={this.changeFakulteti} value={Fakulteti}>
                                <option value="0">Fakulteti</option>
                                {fakultetetFilter.map(fakulteti =>
                                    <option value={fakulteti.FakultetiID}>{fakulteti.Emri}</option>
                                    )}
                            </select>
                            <select onChange={this.changeDega} value={Dega}>
                                <option value="0">Dega</option>
                                {degetFilter.map(deget =>
                                    <option value={deget.DegaID}>{qytetet.find(qyteti => qyteti.QytetiID===deget.Qyteti)?.Emri}</option>
                                    )}
                            </select>
                        </div>
                        <div id={stylist.shtetiInputDiv}>
                            <select onChange={this.changeDrejtimi} value={Drejtimi}>
                                <option value="0">Drejtimi</option>
                                {drejtimetFilter.map(drejtimet =>
                                    <option value={drejtimet.DrejtimiID}>{drejtimet.Emri}</option>
                                    )}
                            </select>
                            <select onChange={this.changeSpecializimi} value={Specializimi}>
                                <option value="0">Specializimi</option>
                                {specializimetFilter.map(specializimi =>
                                    <option value={specializimi.SpecializimiID}>{specializimi.EmriSpecializimit}</option>
                                    )}
                            </select>
                        </div>
                    <button onClick={() => this.userExists(Email)}>REGISTER</button>
                </div>
            </div>
        </div>
        )
    }
}