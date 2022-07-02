import react,{Component} from 'react';
import StudentData from '../AnyUseComponents/StudentData';
import variables from '../CRUDs/Variables';
import stylist from './Login.module.css';
import {NavLink} from 'react-router-dom';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            studentet:[],
            profesoret:[],
            Email:"",
            Password:"",
            passwordShown:false
        }
    }
    refreshList(){
        fetch(variables.API_URL+'studenti')
        .then(response=>response.json()).then(data=>{this.setState({studentet:data});});

        fetch(variables.API_URL+'profesori')
        .then(response=>response.json()).then(data=>{this.setState({profesoret:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmail = e =>{
        this.setState({Email: e.target.value})
    }
    changePassword = e =>{
        this.setState({Password: e.target.value});
    }
    login(email, password){
        var user = this.state.studentet.find(studenti => studenti.Email == email && studenti.Password == password);
        if(user == null){
            user = this.state.profesoret.find(profesori => profesori.Email == email && profesori.Password == password);
            if(user == null){
                return alert("Login was unsuccessful!")
            }else{
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", "professor")
            }
        }else{
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", "student")
        }
        window.location.href = '../';
    }
    render(){
        const{
            studentet,
            profesoret,
            Email,
            Password,
            passwordShown
        }=this.state;

        return(
        <div className={stylist.loginDiv}>
            <div id={stylist.loginForm}>
                <h2>LOG IN</h2>
                <div id={stylist.inputDiv}>
                    <div id={stylist.emailInput}>
                        <input type="text" value={Email} onChange={this.changeEmail} placeholder="Email"/>
                    </div>
                    <div id={stylist.passwordInput}>
                        <input type={passwordShown? "text" : "password"} value={Password} onChange={this.changePassword} placeholder="Password" id="passwordID"/><svg id={stylist.showPassword} onClick={() => {if(this.state.passwordShown){this.setState({passwordShown: false})}else{this.setState({passwordShown: true})}}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16  "><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>
                    </div>
                    <button onClick={() => this.login(Email, Password)}>LOG IN</button>
                </div>
                <p>Not an active Student? <NavLink to="/register">Apply Here</NavLink></p>
            </div>
        </div>
        )
    }
}