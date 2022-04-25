import {tsConstructorType} from '@babel/types';
import React, { Component } from "react";
import stylist from "./Njoftimet.module.css";
import variables from "../Variables";

export class Njoftimet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      njoftimet: [],
      modalTitle: "",
      NjoftimiID: 0,
      Titulli: "",
      Pershkrimi: "",
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
    });
  }
  editClick(njoft) {
    this.setState({
      modalTitle: "Ndrysho Njoftimin",
      NjoftimiID: njoft.NjoftimiID,
      Titulli: njoft.Titulli,
      Pershkrimi: njoft.Pershkrimi,
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
    const { njoftimet, modalTitle, Titulli, Pershkrimi, NjoftimiID } = this.state;
    return (
      <div className={stylist.njoftimetDiv}>
        <button
          type="button"
          id={stylist.shtoNjoftimin}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}>
          Shto Njoftimin
        </button>
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
        <div
          className="modal fade"
          id="#exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div id={stylist.insertionDivs}>
                  <div>
                    <span className="input-group-text">Titulli</span>
                    <br></br>
                    <input
                      type="text"
                      className="form-control"
                      value={Titulli}
                      onChange={this.ndryshoTitullin}
                    ></input>
                  </div>
                  <div>
                    <span>Pershkrimi</span><br></br>
                    <input
                      type="text"
                      className="form-control"
                      value={Pershkrimi}
                      onChange={this.ndryshoPershkrimin}
                    ></input>
                  </div>
                </div>
                {NjoftimiID === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}
                {NjoftimiID !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Njoftimet;
