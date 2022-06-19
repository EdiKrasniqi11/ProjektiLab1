import React,{Component} from 'react';
import stylist from './Home.module.css'
import variables from '../Variables'
import StudentData from '../AnyUseComponents/StudentData'

export class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            galeria: [],
            lajmet: []
        }
    }
    refreshList(){
        fetch(variables.API_URL+'galeria')
        .then(response=>response.json()).then(data=>{this.setState({galeria:data});});

        fetch(variables.API_URL+'lajmet')
        .then(response=>response.json()).then(data=>{this.setState({lajmet:data});});
    }
    componentDidMount(){
        this.refreshList();
    }
    render(){
        const{
            galeria,
            lajmet
        }=this.state;
        return(
            <div className={stylist.homeDiv}>
                <div id={stylist.titleDiv}>
                    <h1>Welcome to Prishtina University</h1>
                </div>
                <div id={stylist.galeryDiv}>
                    <h3>Galeria</h3>
                    <div id={stylist.pictureDiv}>
                        {galeria.slice(0,4).map(item =>
                            <div className={stylist.photo}>
                                <img src={require('../../../Laboratori1/Laboratori1/Photos/'+item.Foto)} height="80%" width="100%"/>
                                <p>{item.Pershkrimi}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div id={stylist.galeryDiv}>
                    <h3>Lajmet</h3>
                    <div id={stylist.pictureDiv}>
                        {lajmet.slice(0,4).map(item =>
                            <div className={stylist.photo}>
                                <img src={require('../../../Laboratori1/Laboratori1/Photos/'+item.Foto)} height="80%" width="100%"/>
                                <p>{item.Titulli}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;