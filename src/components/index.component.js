import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listPortfolios, getusermain } from "../graphql/queries";
import Portfolio from "./user/portfolio.component";
import Sidebar from "./user/sidebar.component";
import Profile from "./user/profile.component";
import Navbar from "../components/navbar.component";
import { DashboardPortfolios } from "./user/functions/custom_queries";
import * as mutations from "../graphql/mutations";

class Index extends Component {
  constructor(props) {
    super(props);
    console.log("Index constructor // State after assignment : ");
    this.state = {
      portfolioList: [],
      slimSide:false
    };
  }
  wait = ms => {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  };

  triggerSide = () =>{
    this.setState({
      slimSide:!this.state.slimSide
    })
  }
  render() {
    console.log(this.props);
    const triggerObject = {
      slimSide: this.state.slimSide,
      triggerSide : this.triggerSide
    }
    if (this.props.data.isAuthenticated) {
      return (
        <div className=" wrap ">
          <Navbar data={this.props.data} trigger = {triggerObject}></Navbar>

          <div className="container-fluid main">
            {" "}
            {this.state.slimSide? "SLIM" : <Sidebar data={this.props.data}/>}
            <Portfolio data={this.props.data} trigger = {triggerObject} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="main">
          <Navbar data={this.props.data} ></Navbar>

          <div class="overflow-auto test2">
            This is an example of using <code>.overflow-auto</code> on an
            element with set width and height dimensions. By design, this
            content will vertically scroll.
          </div>
        </div>
      );
    }
  }
}

export default Index;
