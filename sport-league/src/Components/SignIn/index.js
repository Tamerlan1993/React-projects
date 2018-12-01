import React, { Component } from "react";
import FormField from "../ui/FormField";
import { validate } from "../ui/mixs";
import { firebase } from "../../firebase";

class SignIn extends Component {
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
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        validatoinMessage: ""
      }
    }
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
      firebase
        .auth()
        .signInWithEmailAndPassword(dataSubmit.email, dataSubmit.password)
        .then(() => {
          this.props.history.push("/dashboard")
        })
        .catch(err => {
          this.setState({
            formError: true
          });
        });
    } else {
      this.setState({
        formError: true
      });
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
  render() {
    return (
      <div className="container">
        <div style={{ margin: "100px" }} className="signin_wrapper">
          <form onSubmit={e => this.submitForm(e)}>
            <h2>Please login</h2>

            <FormField
              id={"email"}
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"password"}
              formData={this.state.formData.password}
              change={element => this.updateForm(element)}
            />

            {this.state.formError ? (
              <div className="error_label">something is wrong</div>
            ) : (
              ""
            )}

            <button onClick={this.submitForm}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
