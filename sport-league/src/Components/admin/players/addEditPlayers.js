import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";

import FormField from "../../ui/FormField";

import { validate } from "../../ui/mixs";
import Fileuploader from "../../ui/fileUploader";
import { firebasePlayers, firebaseDB, firebase } from "../../../firebase";

export class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player lastname",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player number",
          name: "number_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select a position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false,
      }
    }
  };

  updateForm(element, content = "") {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  submitForm = e => {
    e.preventDefault();
    let dataSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === "Edit Player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataSubmit)
          .then(() => {
            this.successForm("Update correctlty");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        firebasePlayers
          .push(dataSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  successForm = msg => {
    this.setState({
      formSuccess: msg
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  };

  updateFields = (player, playerId, type, defaultImg) => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType: type,
      formData: newFormData
    });
  };

  componentDidMount = () => {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({
        ...this.state,
        formType: "Add player"
      });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();
          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, "Edit Player", url);
            })
            .catch(e => {
              this.updateFields(
                { ...playerData, image: "" },
                playerId,
                "Edit Player",
                ""
              );
            });
        });
    }
  };

  resetImg = () => {
    const newFormdata = { ...this.state.formData };
    newFormdata["image"].value = "";
    newFormdata["image"].valid = false;
    newFormdata["image"].value = "";
    this.setState({
      formData: newFormdata,
      defaultImg: ""
    });
  };
  storeFilename = filename => {
    this.updateForm(
      {
        id: "image"
      },
      filename
    );
  };
  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={e => this.submitForm(e)}>
              <Fileuploader
                dir="players"
                tag={"Player image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImg={() => this.resetImg()}
                filename={filename => this.storeFilename(filename)}
              />

              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={"lastname"}
                formData={this.state.formData.lastname}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={"number"}
                formData={this.state.formData.number}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={"position"}
                formData={this.state.formData.position}
                change={element => this.updateForm(element)}
              />

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

export default AddEditPlayers;
