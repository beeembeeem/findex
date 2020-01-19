import React, { Component } from "react";
import { Link } from "react-router-dom";
import navbarSettings from "../settings/navbar";
import Search from "./user/search.component.js";
import Sidebar from "./user/sidebar.component";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true};
  }
     
  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  }
  componentDidMount() {}

  render() {
    if (this.props.data.isAuthenticated) {
      this.navbar = [];
      this.buttons = navbarSettings.buttons_auth;
    } else {
      this.navbar = navbarSettings.items_unauth;
      this.buttons = navbarSettings.buttons_unauth;
    }

    return (
      <div
        className={
          this.props.data.isAuthenticated == true ? " container-fluid" : ""
        }
      >
        <nav className=" navbar  px-0  navbar-dark  navbar-expand-lg">
          <div className="logo   justify-content-between w-100">
                      <Search data={this.props.data} />
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.handleToggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="collpase navbar-collapse  m-0 p-0 py-2 py-lg-0"
            id="collapse"
            style={
              this.state.toggle ? { display: "block" } : { display: "none" }
            }
          >
            {!this.props.data.isAuthenticated && (
              <ul className="navbar-nav  d-none">
                {this.navbar.map(item => (
                  <li key={item.id} className={"navbar-item px-3 "}>
                    <Link
                      to={{
                        pathname: item.url
                      }}
                      className="nav-link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="col-sm-4 col-12 text-right p-2">
              {this.buttons.map(item => (
                <Link
                  key={item.id}
                  to={{
                    pathname: item.url
                  }}
                  className="p-2  "
                >
                  <button
                    name="options"
                    id="option1"
                    className="btn btn-outline-secondary px-2 p-1 "
                  >
                    {" "}
                    <p className="m-0 p-0 px-3">{item.name}</p>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
