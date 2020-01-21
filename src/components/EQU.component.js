import React, { Component } from "react";
import symbols from "../symbols";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import Navbar from "../components/navbar.component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter
} from "react-router-dom";

class EQU extends Component {
  constructor(props) {
    super(props);
    var stockSymbol = this.props.match.params.stockProfile;
    var stockState = this.props.location.state;
    var stockProfile = undefined;
    var loading = true;
    if (stockState) {
      stockProfile = this.props.location.state.profile;
      loading = false;
    }
    this.state = {
      stockSymbol: stockSymbol,
      stockProfile: stockProfile,
      loading: loading
    };
  }
  componentDidMount() {
    console.log("mount");
    if (!this.state.stockProfile) {
      console.log("no profile");
      this.setState({});
    }
  }
  async componentDidUpdate() {
    var stockState = this.props.location.state;
    var stockSymbol = this.props.match.params.stockProfile;
    console.log("component updating");
    console.log(this.props);
    if (
      stockState &&
      this.state.stockProfile &&
      stockState.profile != this.state.stockProfile
    ) {
      console.log("true?");
      var stockProfile = this.props.location.state.profile;
      this.setState({
        stockSymbol: stockSymbol,
        stockProfile: stockProfile
      });
    } else if (!this.state.stockProfile) {
      var data = await this.fetchProfile(stockSymbol);
      var stockProfile = data.profile;
      this.setState({
        stockSymbol: stockSymbol,
        stockProfile: stockProfile
      });
    } else {
    }
  }
  fetchProfile = async stockSymbol => {
    try {
      var data = await fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${stockSymbol}`
      );
      data = await data.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  add = async () => {
    for (var i = 46; symbols.length; i++) {
      console.log(symbols[i]);
      const input = {
        symbol: symbols[i].symbol
      };
      if (symbols[i].name) {
        input.name = symbols[i].name;
      }
      if (symbols[i].name == "") {
        input.name = "N/A";
      } else {
        input.name = symbols[i].name;
      }
      const putMethod = {
        method: "PUT", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8" // Indicates the content
        },
        body: JSON.stringify(input) // We send data in JSON format
      };
      await global
        .fetch(
          `https://search-financeweb-xmgf4biyujgrl4xi256rrdjwau.us-east-1.es.amazonaws.com/stocks/equi/${i}`,
          putMethod
        )
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)); // Do something with the error
      this.wait(300);
    }
  };
  wait = ms => {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div className="wrap">
        <Navbar data={this.props.data}></Navbar>
        <div className="container mt-md-3 mt-lg-4  bg-dark p-3 pb-5">
          {!this.state.stockProfile ? (
            <div className="data-loader"> </div>
          ) : (
            <div className="row">
              <div className="col-12  text-white">
                <div className="row">
                  <div className="col-8 ">
                  <span class="badge badge-info">{this.state.stockSymbol}  </span>
                    {" " + this.state.stockProfile.companyName}
                  </div>
                  <div className="col-4 ">
                    <div className="row text-right">
                      <div className="col-12 ">
                        {this.state.stockProfile.price} USD{" "}
                      </div>
                      <div className="col-12 smallerText">
                        {this.state.stockProfile.changes} {" "}
                        {this.state.stockProfile.changesPercentage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 pt-1 text-white smallerText">
                <div className="row text-center">
                  <div className="col-6">
                    <div className="col-12 row py-2">
                      <div className="col-6">Beta: </div>
                      <div className="col-6">
                        {parseFloat(this.state.stockProfile.beta).toPrecision(
                          3
                        )}
                      </div>
                    </div>
                    <div className="col-12 row py-2">
                      <div className="col-6">VolAvg:</div>
                      <div className="col-6">
                        {this.state.stockProfile.volAvg}
                      </div>
                    </div>{" "}
                  </div>
                  <div className="col-6">
                    <div className="col-12 row py-2">
                      <div className="col-6">MrktCp:</div>
                      <div className="col-6">
                        {parseFloat(
                          this.state.stockProfile.mktCap.substring(0, 5)
                        ).toPrecision(4)}
                      </div>
                    </div>
                    <div className="col-12 row py-2">
                      <div className="col-6">LastDiv:</div>
                      <div className="col-6">
                        {this.state.stockProfile.lastDiv}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row text-left">
                  <div className="col-12 py-3">
                    {this.state.stockProfile.description}
                  </div>
                  <div className="col-12 py-3 row text-center">
                    <div className="col-6">Industry and Sector:</div>
                    <div className="col-6">
                      {this.state.stockProfile.industry +
                        " - " +
                        this.state.stockProfile.sector}
                    </div>
                  </div>
                  <div className="col-12 py-3 text-center">
                  <a href={`https://google.com/search?q=${this.state.stockSymbol}`} target="_blank">
                    <button type="button" class="btn btn-outline-info" >
                      Search Google for {this.state.stockSymbol}
                    </button></a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(EQU);
