import React, { Component } from "react";
import variables  from "../Variables";
import ShtetiCSS from "../Shtetet/Shtetet.module.css";
import  render  from "react-dom";

export class Shtetet extends Component{

    constructor(props){
        super(props);
        
        this.state={
            shtete:[],
            modalTitle:"",
            Emri:"",
            ShtetiID:0
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
    changeEmri = (e)=>{
        this.setState({Emri:e.target.value});
    }
    createClick(){
        fetch(variables.API_URL+'shteti',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:this.state.Emri
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            
        })
    }

        render(){
            const{
                shtete,
                modalTitle,
                ShtetiID,
                Emri
            }=this.state;

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
                    <div id={ShtetiCSS.formShteti}>
                        <span id={ShtetiCSS.inputText}>Shteti</span>
                      <div id={ShtetiCSS.inputShteti}><input type="text" id={ShtetiCSS.emriShtetit} value={Emri} onChange={this.changeEmri}/></div>
                        {ShtetiID ==0?
                        <button type="button" id={ShtetiCSS.button1} onClick={()=>this.createClick()}>Create</button>
                        :null}
                        {ShtetiID !=0?
                        <button type="button" id={ShtetiCSS.button1}>Update</button>
                        :null}

                    </div>
        </div>
    )
}
}
export default Shtetet;