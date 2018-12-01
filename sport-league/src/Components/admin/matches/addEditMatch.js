import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";

import FormField from "../../ui/FormField";
import {withRouter} from "react-router-dom"
import { validate, firebaseLooper } from "../../ui/mixs";
import { firebaseTeams, firebaseMatches, firebaseDB } from "../../../firebase";

export class AddEditMatch extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formData: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Select a local team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Select a local team",
          name: "select_local",
          type: "select",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team result",
          name: "select_result",
          type: "select",
          options: [
            { key: "W", value: "W" },
            { key: "L", value: "L" },
            { key: "D", value: "D" },
            { key: "n/a", value: "n/a" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game played ?",
          name: "select_played",
          type: "select",
          options: [{ key: "Yes", value: "Yes" }, { key: "No", value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  updateForm(element) {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    newElement.value = element.event.target.value;

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormData = {
      ...this.state.formData
    };
    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === "local" || key === "away") {
        newFormData[key].config.options = teamOptions;
      }
    }

    this.setState({
      matchId,
      formType: type,
      formData: newFormData,
      teams
    });
  }

  getTeams = (match, type) => {
    const matchId = this.props.match.params.id;
    firebaseTeams.once("value").then(snaphot => {
      const teams = firebaseLooper(snaphot);
      const teamOptions = [];
      snaphot.forEach(childSnaphot => {
        teamOptions.push({
          key: childSnaphot.val().shortName,
          value: childSnaphot.val().shortName
        });
      });
      this.updateFields(match, teamOptions, teams, type, matchId);
    });
  };

  componentDidMount() {
    const matchId = this.props.match.params.id;

    if (!matchId) {
      this.getTeams(false, "Add match");
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then(snaphot => {
          const match = snaphot.val();
          this.getTeams(match, "Edit match");
        });
    }
  }

  successForm = message => {
    this.setState({
      formSuccess: `${message}`
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
      this.props.history.push("/admin_matches");
    }, 2000);
  };

  submitForm = e => {
    e.preventDefault();
    let dataSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    this.state.teams.forEach(team => {
      if (team.shortName === dataSubmit.local) {
        dataSubmit["localThmb"] = team.thmb;
      }

      if (team.shortName === dataSubmit.away) {
        dataSubmit["awayThmb"] = team.thmb;
      }
    });

    if (formIsValid) {
      if (this.state.formType === "Edit match") {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(dataSubmit)
          .then(() => {
            this.successForm("Updated successfullly");
            
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        firebaseMatches
          .push(dataSubmit)
          .then(() => {
            this.props.history.push("/admin_matches");
          })
          .catch(e => this.setState({ formError: true }));
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={e => this.submitForm(e)}>
              <FormField
                id={"date"}
                formData={this.state.formData.date}
                change={element => this.updateForm(element)}
              />

              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"local"}
                      formData={this.state.formData.local}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="right">
                    <FormField
                      id={"resultLocal"}
                      formData={this.state.formData.resultLocal}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"away"}
                      formData={this.state.formData.away}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="right">
                    <FormField
                      id={"resultAway"}
                      formData={this.state.formData.resultAway}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="split_fields">
                <FormField
                  id={"referee"}
                  formData={this.state.formData.referee}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"stadium"}
                  formData={this.state.formData.stadium}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="split_fields">
                <FormField
                  id={"result"}
                  formData={this.state.formData.result}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"final"}
                  formData={this.state.formData.final}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something wrong</div>
              ) : null}
              <div className="admin_submit">
                <button onClick={e => this.submitForm(e)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default withRouter(AddEditMatch);
