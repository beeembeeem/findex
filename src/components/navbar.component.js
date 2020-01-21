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

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  componentDidMount() {}
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
      <nav className="navbar row py-0  ">
        {/* Handle Mobile Bar */}
        <div className="row fixed-bottom mobile-bar  p-2 text-center d-lg-none">
          {" "}
          <div className="col d-flex justify-content-around p-0">
            {this.props.data.isAuthenticated
              ? navbarSettings.items_auth.map(each => (
                  <a href={each.url}>
                    <button type="button" class="btn btn-outline-info btn-sm">
                      {each.name}
                    </button>
                  </a>
                ))
              : navbarSettings.items_unauth.map(each => (
                  <div className="col d-flex justify-content-around p-0" key={each.id}>
                  <a href={each.url}>
                    <button type="button" class="btn btn-outline-info btn-sm">
                      {each.name}
                    </button>
                  </a>                  </div>
                ))}
          </div>
        </div>
        {/* Logo Section */}
        <div className="text-center navbar-brand-wrapper col-2 text-light col-md-4 col-lg-2 align-items-center justify-content-center ">
          INVX
        </div>
        {/* Top Bar section */}
        <div className="navbar-menu-wrapper px-0  row col-10 col-md-8 col-lg-10 align-items-center justify-content-end">
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

          <div className="col-12 col-lg-8">
            <Search />
          </div>
          <div
            class={
              this.props.data.isAuthenticated
                ? " justify-content-center d-none d-lg-flex col-lg-3"
                : " justify-content-center d-none d-lg-flex col-lg-4"
            }
          >
            {this.props.data.isAuthenticated
              ? navbarSettings.items_auth.map(each => (
                  <div className="col d-inline" key={each.id}>
                    <a href={each.url}>{each.name}</a>
                  </div>
                ))
              : navbarSettings.items_unauth.map(each => (
                  <div className="col d-inline" key={each.id}>
                    <a href={each.url}>{each.name}</a>
                  </div>
                ))}
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
