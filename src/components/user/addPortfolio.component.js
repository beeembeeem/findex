import React, { Component } from "react";
import portfolioSettings from "../../settings/portfolio";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Case from "case";
import $ from "jquery";
import AddStock from "./addStock.component";
var yahooFinance = require("yahoo-finance");

class addPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStockList: [],
      searchField: "",
      selectedStockList: [],
      searchDuplicateError: "",
      dupAlert: false,
      sucAlert: false,
      delAlert: false
    };
    this.portfolioSettings = portfolioSettings;
  }
  componentDidMount() {
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createPortfolio = async e => {
    e.preventDefault();
    if (!this.state.name || !this.state.type) {
      this.setState({
        noInputAlert: true
      });
    } else if (
      this.props.data.isAuthenticated &&
      this.state.name &&
      this.state.type
    ) {
      try {
        const result = await API.graphql(
          graphqlOperation(mutations.createPortfolio, {
            input: { name: this.state.name, type: this.state.type }
          })
        );
        // console.log("Added Portfolio succesfully");

        const ID = result.data.createPortfolio.id;
        const stocks = JSON.stringify(this.state.searchStockList);
        const name = result.data.createPortfolio.type;
        const addStockResult = await API.graphql(
          graphqlOperation(mutations.createPortfolioStockList, {
            input: {
              name: name,
              symbol: stocks,
              createdAt: "Now",
              portfolioStockListPortfolioId: ID
            }
          })
        );

        // console.log("Added Stocklist succesfully");
        this.props.work.redirectToAddPortfolio_f();
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  setSearchStockList = list => {
    this.setState({
      searchStockList: list
    });
  };
  render() {
    return (
      <div className="addPortfolioModal">
        <div className="addPortfolioInner card">
          <div className="card-header ">
            <h5 className="card-header-title">Create a New Portfolio</h5>
            <button
              type="button"
              className="close"
              onClick={this.props.work.redirectToAddPortfolio_f}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="row mx-0 px-2 pb-4">
            <form className="card-body col-12 col-lg-6 form-holder ">
              {this.state.noInputAlert && (!this.state.name||!this.state.type) ? (
                <div class="alert alert-danger" role="alert">
                  Your portfolio must have{" "}
                  {!this.state.name && !this.state.type
                    ? "a name and a type"
                    : !this.state.name
                    ? "a name"
                    : !this.state.type
                    ? "a type"
                    : ""}
                </div>
              ) : (
                ""
              )}
              {this.portfolioSettings.addPortfolioFields.map(item => (
                <div className="form-group col-12 col-mg-6  " key={item.id}>
                  <label htmlFor={item.label}>{item.label}</label>
                  <input
                    name={item.name}
                    type={item.type}
                    className="form-control"
                    placeholder={item.placeholder}
                    onChange={this.handleChange}
                    list={item.list}
                  />
                  <datalist id={item.list}>
                    {item.list != undefined
                      ? item.listData.map(eachData => (
                          <option value={eachData.value} />
                        ))
                      : ""}
                  </datalist>
                </div>
              ))}
            </form>
            <AddStock
              searchStockList={{ setSearchStockList: this.setSearchStockList }}
            />
            <div className="col-12 col-lg-4">
              <button
                type="submit"
                className="btn btn-primary "
                onClick={this.createPortfolio}
              >
                Submit
              </button>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default addPortfolio;
