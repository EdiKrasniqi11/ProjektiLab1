import React, { Component } from "react";
import variables  from "../Variables";
import ShtetiCSS from "../Shtetet/Shtetet.module.css";
import  render  from "react-dom";

export class Shtetet extends Component{

    constructor(props){
        super(props);
        
        this.state={
            shtete:[]
        }
    }
    refreshList(){
        fetch(variables.API_URL+'shteti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({shtete:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

        render(){
            const{shtete}=this.state;

    return(
        <div id={ShtetiCSS.shtetetDiv}>
            <table>
                <thead>
                <tr>
                    <th>
                        ShtetiID
                    </th>
                    <th>
                        Emri
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
</thead>
<tbody>
                {shtete.map(shtetet=>
                    <tr key={shtetet.ShtetiID}>
                        <td>{shtetet.ShtetiID}</td>
                        <td>{shtetet.Emri}</td>
                        <td>
                            <button type="button" id={ShtetiCSS.button1}>Edit</button>
                            <button type="button" id={ShtetiCSS.button1}>Delete</button>
                        </td>
                    </tr>
                    )}</tbody>
                    </table>
        </div>
    )
}
}
export default Shtetet;