import React, { Component } from "react";
import { Link } from "react-router-dom";
import navbarSettings from "../settings/navbar";
import Search from "./user/search.component.js";
import Sidebar from "./user/sidebar.component";
import SidebarM from "./user/sidebar-m.component";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      showMobileBar: false
    };
  }
// Hanlder function for toggle button

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  componentDidMount() {}
  // Hanlder function for side bar
  handleSideBar = e => {
    e.preventDefault();
    const mobile = window.innerWidth < 992;
    if (mobile) {
      this.setState({
        showMobileBar: !this.state.showMobileBar
      });
    } else {
      this.props.trigger.triggerSide();
    }
    console.log(window.innerWidth);
  };
  render() {
    if (this.props.data.isAuthenticated) {
      this.navbar = navbarSettings.items_auth;
      this.buttons = navbarSettings.buttons_auth;
    } else {
      this.navbar = navbarSettings.items_unauth;
      this.buttons = navbarSettings.buttons_unauth;
    }
    console.log(this.props);
    return (
      <nav className={this.props.data.isAuthenticated?"navbar row mx-0 py-0 ":"navbar row mx-0 py-0  "}>
        {/* Handle Mobile Bar */}
        <div className="row fixed-bottom mobile-bar   text-center d-lg-none">
          {" "}
          <div className="col d-flex justify-content-around p-0">
              { this.props.data.isAuthenticated && this.navbar.map(each => (
                  <a href={each.url}>
                    <button type="button" class="btn btn-outline-info btn-sm">
                      {each.name}
                    </button>
                  </a>
                ))}
              
          </div>
        </div>
        {/* Logo Section */}
        <div className="text-center  navbar-brand-wrapper px-0 col-3 col-sm-2 text-light col-md-4 col-lg-2 align-items-center justify-content-center ">
  <a href="/">{navbarSettings.brand_name}</a>
        </div>
        {/* Top Bar section */}
        <div className="navbar-menu-wrapper px-0 mx-0 row col-9 col-sm-10 col-md-8 col-lg-10 align-items-center justify-content-end">
          {/* If logged in, show the sidebar button */}
          {this.props.data.isAuthenticated ? (
            <button
              class="navbar-toggler d-none d-lg-block  col-lg-1 d-ml-auto mr-lg-auto ml-lg-0 navbar-toggler align-self-center"
              type="button"
              onClick={this.handleSideBar}
              data-toggle="minimize"
            >
              <span class="mdi mdi-menu">
                <i class="fas fa-bars"></i>
              </span>
            </button>
          ) : (
            ""
          )}

          <div className="col-12 col-lg-7 pr-0">
            <Search />
          </div>
          <div
            class={this.props.data.isAuthenticated?(" pl-lg-0 justify-content-center d-none d-lg-flex col-lg-4"):" pl-lg-0 justify-content-center d-none d-lg-flex col-lg-5"}
          >
            { this.navbar.map(each => (
                  <div className="col text-center d-inline" key={each.id}>
                    <a href={each.url} class="text-nowrap">{each.name}</a>
                  </div>
                ))
              }
          </div>
        </div>
        {/* Side bar Load if logged in */}
        {this.props.isAuthenticated ? (
          <SidebarM
            data={this.props.data}
            trigger={{ showMobileBar: this.state.showMobileBar }}
          />
        ) : (
          ""
        )}
      </nav>
    );
  }
}
