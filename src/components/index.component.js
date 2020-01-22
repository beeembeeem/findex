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
      slimSide: false
    };
  }
  async componentDidMount() {
    // Most Active Fetch
    try {
      var data = await fetch(
        "https://financialmodelingprep.com/api/v3/stock/actives"
      );
      var data = await data.json();
      // Most Gainer Fetch
      var dataG = await fetch(
        "https://financialmodelingprep.com/api/v3/stock/gainers"
      );
      var dataG = await dataG.json();
      console.log(data);
      console.log(dataG);

      this.setState({
        activeList: data.mostActiveStock,
        gainerList: dataG.mostGainerStock
      });
    } catch (error) {}
  }
  wait = ms => {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  };

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
          <div className="container-fluid main ">
            <div className="overlay-phone  mx-0">
              <div className="row">
                <div className="col-12 text-white ">
                  <h1 class="display-4 main-heading px-5 pt-3 pt-lg-5">
                    Upcoming AI Powered Financial Index
                  </h1>
                </div>
                <div className="col-12 pt-lg-5 row mx-0 text-white">
                  <div className="col-6 stayTuned ml-auto">
                    Sign up today and stay tuned for our official launch
                  </div>
                </div>
                <div className="col-12 pt-lg-5 row mx-0 text-white d-none d-lg-block">
                  <div className="col-6  ml-auto pr-5 ">
                    <div className="row mx-0 mainbg px-4 py-4 rounded">
                      <div className="col-12 mx-0">
                        <h5>Today's Most Active Performers</h5>
                      </div>
                      {this.state.activeList &&
                        this.state.activeList.map(item => (
                          <div className="col-lg-4  col-6 py-3 px-2 px-lg-3 ">
                            <div className="card text-white bg-primary">
                              <div className="card-header row mx-0 p-1 py-2 text-center">
                                {/* MAIN SIGN */}
                                <div className="col-12 py-1 px-0 d-flex justify-content-around ">
                                  {" "}
                                  <span className="badge badge-light text-dark badge-pill ">
                                    {item.ticker}
                                  </span>
                                  <p className="m-0 p-0 d-inline smallerText">
                                    {"$" + item.price}
                                  </p>
                                </div>
                                <div className="col-12 py-1 px-0 d-flex justify-content-around ">
                                  {" "}
                                  <p className="m-0 p-0 d-inline smallerText">
                                    {item.changes}
                                  </p>
                                  <p className="m-0 p-0 d-inline smallerText">
                                    {"$" + item.changesPercentage}
                                  </p>
                                </div>
                              </div>
                              {/* dumping and expanding information about selected stocks */}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Index;
