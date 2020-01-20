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
      showMobileBar:false
    };
  }

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  componentDidMount() {}
  handleSideBar = (e) =>{
    e.preventDefault()
    const mobile = window.innerWidth <992
    if(mobile){
      this.setState({
        showMobileBar:!this.state.showMobileBar
      })
    } else{
      this.props.trigger.triggerSide()
    }
    console.log(window.innerWidth)
  }
  render() {
    if (this.props.data.isAuthenticated) {
      this.navbar = navbarSettings.items_auth;
      this.buttons = navbarSettings.buttons_auth;
    } else {
      this.navbar = navbarSettings.items_unauth;
      this.buttons = navbarSettings.buttons_unauth;
    }
    console.log(this.props)
    return (
      <nav className="navbar col-lg-12 col-12 p-0   ">
      {/* Logo Section */}
        <div className="text-center navbar-brand-wrapper col-6  col-md-4 col-lg-2 align-items-center justify-content-center ">
          <h5 className="navbar-brand text-light m-0">Invex.AI</h5>
        </div>
        {/* Top Bar section */}
        <div className="navbar-menu-wrapper px-0 row col-6 col-md-8 col-lg-10 align-items-center justify-content-end">
        <button class="navbar-toggler col-lg-1 col-8 ml-auto mr-lg-auto ml-lg-0 navbar-toggler align-self-center" type="button" onClick={this.handleSideBar} data-toggle="minimize">
          <span class="mdi mdi-menu"><i class="fas fa-bars"></i>
</span>
        </button>
              <div className="SearchBarContainer d-none d-lg-block col-lg-8">
          <Search/></div>
        <div class=" pull-right d-none d-lg-block col-lg-3">
    asdasd
    asdasd
        </div>
        </div>
        <div className="col-12 d-lg-none py-3 rounded">
                  <Search/>
        </div>
        {this.state.showMobileBar? <SidebarM data={this.props.data}/> : ""}
      </nav>
    );
  }
}
