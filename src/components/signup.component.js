import React, { Component } from "react";
import signupSetting from "../settings/signup";
import { Auth } from "aws-amplify";
import Navbar from "../components/navbar.component";
import TopLeftAlert from "./alert/topleftalert.component";

global.fetch("node-fetch");

export default class signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      password: undefined,
      family_name: undefined,
      name: undefined,
      email: undefined,
      confirmationCode: "",
      verified: false,
      fields: signupSetting.fields
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUp = this.signUp.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
  }
  // Signup Handler Function
  signUp(e) {
    const { username, password, email, name, family_name } = this.state;
    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        name: name,
        family_name: family_name
      }
    })
      .then(() => {
        console.log("Successfully signed up");
        // console.log(this.state)
        this.setState({
          password: "",
          email: "",
          phone_number: "",
          verified: true,
          failed: false,
          failedMessage: ""
        });
        e.target.reset();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          failed: true,
          failedMessage: err.message
        });
      });
  }
  // Confirm Signup --- Not in use currently
  confirmSignUp() {
    // console.log(this.state)
    const { username, confirmationCode } = this.state;
    Auth.confirmSignUp(username, confirmationCode)
      .then(result => {
        // console.log(result)
        console.log("Successfully confirmed signed up");
        this.setState({
          confirmationCode: "",
          username: ""
        });
        window.location.href = "/signin";
      })
      .catch(err => console.log(`Error confirming sign up - ${err}`));
  }

  handleSubmit = e => {
    const { verified } = this.state;

    e.preventDefault();

    if (verified) {
      this.confirmSignUp();
    } else {
      this.signUp(e);
    }
  };

  handleConfirmChange = event => {
    this.setState({
      confirmationCode: event.target.value
    });
  };
// Hanlder function for input fields
  handleSignUpChange = event => {
    this.state.fields.map(item => {
      if (event.target.name === item.name) {
        this.setState({
          [item.attr]: event.target.value
        });
      }
    });
  };

  render() {
    const { verified } = this.state;
    if (verified) {
      return (
        <div>
          <Navbar data={this.props.data}></Navbar>
          <div className="container ">
            <div className="login-box  mx-auto my-4 text-light mainbg rounded p-3">
              <h4>Check your mailbox to confirm your account</h4>
              <a href="/signin">Take me to Sign in</a>
            </div>
          </div>{" "}
        </div>
      );
    } else {
      return (
        <div>
          {this.state.failed ? (
            <TopLeftAlert alert={{ text: this.state.failedMessage }} />
          ) : (
            ""
          )}
          <Navbar data={this.props.data}></Navbar>
          <div className="container pb-4 ">
            <div className="login-box  mx-auto my-4 text-light mainbg rounded p-5">
              <form onSubmit={this.handleSubmit}>
                {signupSetting.fields.map(item => (
                  <div key={item.id} className="form-group">
                    <label>{item.label}</label>
                    <input
                      name={item.name}
                      type={item.type}
                      className="form-control"
                      id={item.id}
                      placeholder={item.placeholder}
                      value={this.state.value}
                      onChange={this.handleSignUpChange}
                    ></input>
                  </div>
                ))}
                <button type="submit" className="btn btn-info" value="Submit">
                  Submit
                </button>
              </form>
            </div>
          </div>{" "}
        </div>
      );
    }
  }
}
