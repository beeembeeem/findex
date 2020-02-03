import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listPortfolios, getusermain } from "../graphql/queries";
import Portfolio from "./user/portfolio.component";
import Sidebar from "./user/sidebar.component";
import Profile from "./user/profile.component";
import Navbar from "../components/navbar.component";
import { DashboardPortfolios } from "./user/functions/custom_queries";
import * as mutations from "../graphql/mutations";
import navbarSettings from "../settings/navbar";
import ActiveList from "./main/activelist.component.js";
class Index extends Component {
  constructor(props) {
    super(props);
    console.log("Index constructor // State after assignment : ");
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      portfolioList: [],
      slimSide: false,
      height: 512
    };
  }
  // Helper function for window size
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  // update window size in state on mounting of components
  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  
  }
  // Helper wait function
  wait = ms => {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  };

// trigger function to collapse navbar
  triggerSide = () => {
    this.setState({
      slimSide: !this.state.slimSide
    });
  };
  render() {
    console.log(this.state);
    const triggerObject = {
      slimSide: this.state.slimSide,
      triggerSide: this.triggerSide
    };
    if (this.props.data.isAuthenticated) {
      return (
        <div className=" wrap ">
          <Navbar data={this.props.data} trigger={triggerObject}></Navbar>

          <div className="container-fluid main">
            {" "}
            {this.state.slimSide ? "" : <Sidebar data={this.props.data} />}
            <Portfolio data={this.props.data} trigger={triggerObject} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrap">
          <Navbar data={this.props.data}></Navbar>
          <div className="container-fluid row mx-0 main ">
            <div className="overlay-phone Gscroll col-12 mx-0">
              <div className="row">
                <div className="col-12 text-white ">
                  <h1 class="display-4 main-heading px-5 pt-3 pt-lg-5">
                    Upcoming AI Powered Financial Platform
                  </h1>
                </div>
                <div className="col-12 pt-lg-5 row mx-0 text-white">
                  <div className="col-6 stayTuned ml-auto">
                    {!this.props.data.isAuthenticated &&
                    this.state.width < 992 ? (
                      navbarSettings.buttons_unauth.map(each => (
                        <div className="col-12 pt-2">
                          {" "}
                          <a href={each.url}>
                            <button
                              type="button"
                              class="btn btn-outline-info  d-block "
                            >
                              {each.name}
                            </button>
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="col-12"></div>
                    )}
                  </div>
                </div>
                <div className="col-12 pt-lg-5 row mx-0 text-white d-none d-lg-block">
                  <div className="col-6  ml-auto pr-5 ">
                    <ActiveList />
                  </div>
                </div>
              </div>
            </div>
            <div className="row col-12 mx-0 text-white px-0 d-lg-none">
              <div className="col-12 px-0 ">
                <ActiveList />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Index;
