import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";

class notFound extends Component {
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
  }
  componentDidMount() {
    this.setState({ comment: "Hello" });
  }

  search = async () => {
    const userinput = "*" + this.state.searchField + "*";
    const query = {
      query: {
        query_string: {
          fields: ["symbol^2", "name"],
          query: userinput
        }
      },
      size: 500
    };

    try {
      const result = await global.fetch(
        "https://search-financeweb-xmgf4biyujgrl4xi256rrdjwau.us-east-1.es.amazonaws.com/stocks/equi/_search",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(query)
        }
      );
      const json = await result.json();
      this.setState({
        searchStockList: json.hits.hits
      });
    } catch (error) {
      console.log(error);
    }
  };

  searchHandle = event => {
    const len = event.target.value.length;
    if (this.timeout) {
      console.log("CANCELING TIMEOUT");
      clearTimeout(this.timeout);
    }
    this.setState({
      [event.target.name]: event.target.value
    });
    if (len > 0) {
      this.timeout = setTimeout(() => {
        console.log("TIMEOUT");
        this.search();
      }, 200);
    }
  };

  searchClickHandler = (e, sym) => {
    e.preventDefault();

    var item = this.state.selectedStockList;
    var duplicate = item.some(each => each["symbol"] === sym);
    if (!duplicate) {
      item.push({
        symbol: sym
      });
      if (this.alertTimeOut) {
        clearTimeout(this.alertTimeOut);
      }
      document.getElementsByClassName("search-alert")[0].style.opacity = 1;
      this.setState(
        {
          selectedStockList: item,
          searchAlertValue: sym,
          sucAlert: true,
          dupAlert: false,
          delAlert: false
        },
        () => {
          this.alertTimeOut = setTimeout(() => {
            document.getElementsByClassName(
              "search-alert"
            )[0].style.opacity = 0;
          }, 1500);
        }
      );
    } else {
      if (this.alertTimeOut) {
        clearTimeout(this.alertTimeOut);
      }
      document.getElementsByClassName("search-alert")[0].style.opacity = 1;
      this.setState(
        {
          searchAlertValue: sym,
          dupAlert: true,
          sucAlert: false,
          delAlert: false
        },
        () => {
          this.alertTimeOut = setTimeout(() => {
            document.getElementsByClassName(
              "search-alert"
            )[0].style.opacity = 0;
          }, 1500);
        }
      );
    }
  };
  handleStockDelete = (e, symbol) => {
    e.preventDefault();
    if (this.alertTimeOut) {
      clearTimeout(this.alertTimeOut);
    }
    var newList = this.state.selectedStockList.filter(
      each => each["symbol"] != symbol
    );
    document.getElementsByClassName("search-alert")[0].style.opacity = 1;
    this.setState(
      {
        selectedStockList: newList,
        delAlert: true,
        dupAlert: false,
        sucAlert: false,
        searchAlertValue: symbol
      },
      () => {
        this.alertTimeOut = setTimeout(() => {
          document.getElementsByClassName("search-alert")[0].style.opacity = 0;
        }, 2000);
      }
    );
  };
  handleStockExpand = async (e, symbol) => {
    e.preventDefault();
    var currentStockList = this.state.selectedStockList;
    var currentStockIndex = currentStockList.findIndex(
      each => each.symbol == symbol
    );
    var currentStock = currentStockList[currentStockIndex];
    if (currentStock.expanded) {
      currentStock.expanded = false;
      currentStockList.splice(currentStockIndex, currentStock);
    } else {
      var data = await fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${currentStock.symbol}`
      );
      data = await data.json();
      console.log(data);
      console.log(currentStock);
      currentStock.expanded = true;
      currentStock.data = data;
      currentStockList.splice(currentStockIndex, currentStock);
    }
    this.setState({
      selectedStockList: currentStockList
    });
  };
  render() {
    return (
      <form className="card-body col-12 col-lg-6 ">
        <div className="form-group col-12 ">
          <label>Add stocks to your portfolio</label>
          <input
            className="form-control"
            type="text"
            placeholder="Search for equities"
            name="searchField"
            onChange={this.searchHandle}
            autocomplete="off"
            type="search"
          />
          <ul class="list-group search-list">
            {this.state.searchStockList != [] &&
              this.state.searchField &&
              this.state.searchStockList.map(item => (
                <li
                  class="list-group-item search-result-li d-flex justify-content-between align-items-center "
                  onClick={e => this.searchClickHandler(e, item._source.symbol)}
                >
                  <p className="searchListItem m-0">{item._source.name}</p>

                  <span class="badge searchListItem badge-primary badge-pill">
                    {item._source.symbol}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <div className="justify-content-around row">
          {this.state.selectedStockList.map(item => (
            <div className="col-lg-6 col-12 py-3 px-5 px-lg-3 ">
              <div className="card text-white bg-primary">
                <div className="card-header text-center">
                  {/* MAIN SIGN */}
                  <span className="badge badge-light text-dark badge-pill ">
                    {item.symbol}
                  </span>
                  {/* Close Button */}
                  <button
                    type="button"
                    className="search-stock-close close text-light"
                    aria-label="Close"
                    onClick={e => this.handleStockDelete(e, item.symbol)}
                  >
                    <span aria-hidden="true">&times; </span>
                  </button>
                  <button
                    className="stock-expand-option"
                    onClick={e => this.handleStockExpand(e, item.symbol)}
                  >
                    <span class="fas fa-chevron-down"></span>
                  </button>
                </div>
                {item.expanded && item.data.profile ? (
                  <div class="card-body stock-card-body py-1 text-center ">
                    {" "}
                    <div className="row">
                      <div className="col-12">
                        <a href={item.data.profile.website} target="_blank">
                          {item.data.profile.companyName}
                        </a>
                      </div>
                    </div>
                    <div className=" row ">
                      <div className="col-6">${item.data.profile.price}</div>
                      <div className="col-6">
                        {item.data.profile.changesPercentage}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <a
                          href={`https://www.google.com/search?q=${item.data.profile.industry + " " + item.data.profile.sector}`}
                          target="_blank"
                        >
                          {item.data.profile.industry} <br/>{item.data.profile.sector}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className="alert search-alert alert-secondary box-shadow rounded alert-dismissible fade show"
          role="alert"
        >
          {/* Duplicate Alert */}
          {this.state.dupAlert ? (
            <div>
              <strong>Duplicate Error!</strong> You have selected{" "}
              <span class="badge badge-primary badge-pill">
                {this.state.searchAlertValue}
              </span>{" "}
              already.
            </div>
          ) : // Success Alert
          this.state.sucAlert ? (
            <div>
              <strong>
                Equity{" "}
                <span class="badge badge-primary badge-pill">
                  {this.state.searchAlertValue}
                </span>{" "}
                succesfully added!
              </strong>
            </div>
          ) : // Delete Alert
          this.state.delAlert ? (
            <div>
              <strong>
                Equity{" "}
                <span class="badge badge-primary badge-pill">
                  {this.state.searchAlertValue}
                </span>{" "}
                succesfully <span className="text-danger">deleted</span>!
              </strong>
            </div>
          ) : (
            // else
            ""
          )}
        </div>
      </form>
    );
  }
}

export default notFound;
