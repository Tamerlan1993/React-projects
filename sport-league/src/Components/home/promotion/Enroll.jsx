import React, { Component } from "react";
import { Fade } from "react-reveal";
import FormField from "../../ui/FormField";
import { validate } from "../../ui/mixs";
import { firebasePromotions } from "../../../firebase";

export class PromotionEnroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validatoinMessage: ""
      }
    }
  };
  updateForm = element => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;
    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;
    this.setState({
      formError: "",
      formData: newFormData
    });
  };
  resetFormSuccess = type => {
    const newFormData = { ...this.state.formData };
    for (let key in this.state.formData) {
      newFormData[key].value = "";
      newFormData[key].validationMessage = "";
      newFormData[key].valid = false;
    }
    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: type ? "congraltions" : "Already on database"
    },()=>{
      this.successMsg();
    });
    
  };
  successMsg = () => {
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
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

    if (formIsValid) {
      firebasePromotions
        .orderByChild("email")
        .equalTo(dataSubmit.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasePromotions.push(dataSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };
  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={e => this.submitForm(e)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formData={this.state.formData.email}
                change={element => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">something is wrong</div>
              ) : (
                ""
              )}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={this.submitForm}>Enroll</button>
              <div className="enroll_discl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni praesentium quis suscipit fugit id eos. Ullam molestiae ab labore veniam sapiente rem exercitationem et illum omnis. Numquam dolorem incidunt at?
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default PromotionEnroll;
