import React, { Component } from "react";
import Navbar from "../components/navbar.component";
import loginSetting from "../settings/login";
import { Auth } from "aws-amplify";
import TopLeftAlert from "./alert/topleftalert.component";

global.fetch("node-fetch");

export default class signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signing: false
    };
  }
  // Hanlder function for input fields
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = async event => {
    event.preventDefault();

    // console.log(this.state);
    this.setState({
      signing: true
    });
    try {
      const user = await Auth.signIn(this.state.Username, this.state.Password);
      // console.log(user);
      this.props.data.setSomeState({
        user: user,
        isAuthenticated: true
      });
      window.location.href = "/";
    } catch (error) {
      this.setState({
        failed: true,
        failedMessage: error.message,
        signing: false
      });
      console.log(error);
    }
  };
  render() {
    if (this.props.data.isAuthenticated) {
      return (window.location.href = "/");
    } else if (this.state.signing) {
      return (
        <div className="">
          {" "}
          <Navbar data={this.props.data}></Navbar>
          <div className="row loading">
            <div className="text-center text-light  col-12">
              <img
                src={require("./user/img/loading.svg")}
                className=""
                alt=""
              />
            </div>
          </div>{" "}
        </div>
      );
    } else {
      return (
        <div className="wrap">
          {this.state.failed ? (
            <TopLeftAlert alert={{ text: this.state.failedMessage }} />
          ) : (
            ""
          )}
          <Navbar data={this.props.data}></Navbar>
          <div className="login-box mx-auto my-4 text-light mainbg rounded p-5">
            <form>
              {loginSetting.fields.map(item => (
                <div key={item.id} className="form-group">
                  <label>{item.label}</label>
                  <input
                    name={item.name}
                    type={item.type}
                    className="form-control"
                    id={item.id}
                    placeholder={item.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange}
                  ></input>
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-info"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
