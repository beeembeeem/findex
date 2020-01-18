import React, { Component } from "react";
import portfolioSettings from "../../settings/portfolio";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Case from "case";
import $ from "jquery";
import AddStock from "./addStock.component"
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
      delAlert:false
    };
    this.portfolioSettings = portfolioSettings;
    this.alertTimeOut = 0;
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createPortfolio = async e => {
    e.preventDefault();
    if (this.props.data.isAuthenticated) {
      const result = await API.graphql(
        graphqlOperation(mutations.createPortfolio, {
          input: { name: this.state.name, type: this.state.type }
        })
      );
      console.log("Added Portfolio succesfully");
      console.log(result);
      this.props.work.redirectToAddPortfolio_f();
    }
  };
  render() {
    console.log("render");
    console.log(this.state);
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
                        <AddStock/>

            
            <div className="col-12 col-lg-4">
              <button
                type="submit"
                className="btn btn-primary "
                onClick={this.createPortfolio}
              >
                Submit
              </button>
            </div>            </div>

        </div>
      </div>
    );
  }
}

export default addPortfolio;
