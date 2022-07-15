import React,{Component} from 'react';
import stylist from './Home.module.css'
import variables from '../../CRUDs/Variables'
import {NavLink} from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';

export class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            galeria: [],
            lajmet: [],
            Photopath: variables.PHOTO_URL
        }
    }
    refreshList(){
        fetch(variables.API_URL+'galeria')
        .then(response=>response.json()).then(data=>{this.setState({galeria:data});});

        fetch(variables.API_URL+'lajmet')
        .then(response=>response.json()).then(data=>{this.setState({lajmet:data});});
    }
    selectUserName(){
        if(secureLocalStorage.getItem("user")==null){
            return null;
        }else{
            var user = JSON.parse(secureLocalStorage.getItem("user"));
            var username = user.Emri;
            return username;
        }
    }
    componentDidMount(){
        this.refreshList();
    }
    render(){
        const{
            galeria,
            lajmet,
            Photopath
        }=this.state;
        return(
            <div className={stylist.homeDiv}>
                <div id={stylist.titleDiv}>
                    <h1>Welcome to Prishtina University {this.selectUserName()}</h1>
                </div>
                <div id={stylist.galeryDiv}>
                    <h3>Fotot me te reja ne Galeri</h3>
                    <div id={stylist.pictureDiv}>
                        {galeria.reverse().slice(0,4).map(item =>
                            <div className={stylist.photo}>
                                <img src={Photopath+item.Foto} height="80%" width="100%"/>
                                <p>{item.Pershkrimi}</p>
                            </div>
                        )}
                    </div>
                    <NavLink to="/galeria"><h4>Kliko per me shume...</h4></NavLink>
                </div>
                <div id={stylist.galeryDiv}>
                    <h3>Lajmet</h3>
                    <div id={stylist.pictureDiv}>
                        {lajmet.slice(0,4).map(item =>
                            <div className={stylist.photo}>
                                <img src={Photopath+item.Foto} height="80%" width="100%"/>
                                <p>{item.Titulli}</p>
                            </div>
                        )}
                    </div>
                    <NavLink to="/lajmet"><h4>Kliko per me shume...</h4></NavLink>
                </div>
            </div>
        )
    }
}
export default Home;