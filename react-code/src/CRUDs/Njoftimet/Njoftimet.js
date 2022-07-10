import {tsConstructorType} from '@babel/types';
import React, { Component } from "react";
import stylist from "./Njoftimet.module.css";
import variables from "../Variables";
import Modal from '../../AnyUseComponents/Modal'

export class Njoftimet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      njoftimet: [],
      modalTitle: "",
      NjoftimiID: 0,
      Titulli: "",
      Pershkrimi: "",
      insertModal:false
    };
  }

  refreshList() {
    fetch(variables.API_URL + "njoftimet")
      .then(response => response.json())
      .then(data => {
        this.setState({ njoftimet: data });
      });
  }
  componentDidMount() {
    this.refreshList();
  }
  ndryshoTitullin = (e) => {
    this.setState({ Titulli:e.target.value });
  }
  ndryshoPershkrimin = (e) => {
    this.setState({ Pershkrimi:e.target.value });
  }
  addClick() {
    this.setState({
      modalTitle: "Shto Njoftimin",
      NjoftimiID: 0,
      Titulli: "",
      Pershkrimi: "",
      insertModal:true
    });
  }
  editClick(njoft) {
    this.setState({
      modalTitle: "Ndrysho Njoftimin",
      NjoftimiID: njoft.NjoftimiID,
      Titulli: njoft.Titulli,
      Pershkrimi: njoft.Pershkrimi,
      insertModal:true
    });
  }
  createClick() {
    fetch(variables.API_URL + "njoftimet", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Titulli: this.state.Titulli,
        Pershkrimi: this.state.Pershkrimi,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Insertion Failed");
        }
      );
      this.setState({insertModal:false});
  }
  updateClick() {
    fetch(variables.API_URL + "njoftimet", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        NjoftimiID:this.state.NjoftimiID,
        Titulli:this.state.Titulli,
        Pershkrimi:this.state.Pershkrimi,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Update Failed");
        }
      );
      this.setState({insertModal:false});
  }
  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "njoftimet/" + id, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Deletion Failed");
          }
        );
    }
  }
  render() {
    const { njoftimet, modalTitle, Titulli, Pershkrimi, NjoftimiID, insertModal } = this.state;
    return (
      <div className={stylist.njoftimetDiv}>
              <div id={stylist.buttonDiv}>
                    <button type="button" onClick={() => this.addClick()} id={stylist.addButton}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 12"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></button>
              </div>
        <table>
          <tr>
            <th>NjoftimiID</th>
            <th>Titulli</th>
            <th>Pershkrimi</th>
          </tr>
          {njoftimet.map((njoft) => (
            <tr key={njoft.NjoftimiID}>
              <td>{njoft.NjoftimiID}</td>
              <td>{njoft.Titulli}</td>
              <td>{njoft.Pershkrimi}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => this.editClick(njoft)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => this.deleteClick(njoft.NjoftimiID)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </table>
        {insertModal?<Modal modalSwitch={()=>this.setState({insertModal:false})}>
                <h2>Njoftimi</h2>
                <div id={stylist.insertionDivs}>
                    <div id={stylist.titulliInput}>
                        <input type="text" value={Titulli} onChange={this.ndryshoTitullin} placeholder="Titulli"/>
                    </div>
                    <div id={stylist.pershkrimiInput}>
                        <input type="text" value={Pershkrimi}onChange={this.ndryshoPershkrimin} placeholder="Pershkrimi"/>
                    </div>
                </div>
                {NjoftimiID === 0 ? (
                  <button type="button" onClick={() => this.createClick()}>Create</button>) : null}
                {NjoftimiID !== 0 ? (
                  <button type="button" onClick={() => this.updateClick()}>Update</button>) : null}
          </Modal>:null}
      </div>
    );
  }
}
export default Njoftimet;