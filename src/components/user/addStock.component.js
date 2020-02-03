import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
// Search Modules of this component are similar of those in Search.component
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
    this.alertTimeOut = 0;
  }
  componentDidMount() {}
  // Clear timeout before unmounting
  componentWillUnmount() {
    if (this.alertTimeOut) {
      clearTimeout(this.alertTimeOut);
    }
  }
  // Get stock information about search results
  getSearchChanges = async currentSearchList => {
    var first = true;
    var second = false;
    for (let i = 0; i < currentSearchList.length; i++) {
      var data = {};
      var currentStock = currentSearchList[i];
      try {
        data = await fetch(
          `https://financialmodelingprep.com/api/v3/company/profile/${currentStock._source.symbol}`
        );
        data = await data.json();
        currentStock.data = data;
        currentSearchList.splice(i, currentStock);
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({
      searchStockList: currentSearchList,
      loadingSearch: false
    });
  };

  search = async () => {
    // Cache similar items in current searchstocklist

    var currentSearchList = this.state.searchStockList;
    var updatedSearchList = [];
    currentSearchList.filter(item => {
      if (
        item._source.symbol.includes(this.state.searchField) ||
        item._source.name.includes(this.state.searchField)
      ) {
        updatedSearchList.push(item);
      }
    });
    // update similar items and prepare the new query
    this.setState({
      searchStockList: updatedSearchList
    });
    const userinput = "*" + this.state.searchField + "*";
    var fields = [];
    if (this.state.searchField.length < 3) {
      fields = ["symbol^2", "name"];
    } else {
      fields = ["symbol", "name"];
    }
    const query = {
      query: {
        query_string: {
          fields: fields,
          query: userinput,
          fuzziness: "AUTO"
        }
      },
      size: 20
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
        searchStockList: json.hits.hits,
        loadingSearch: true
      });
      this.getSearchChanges(json.hits.hits);
    } catch (error) {
      console.log(error);
    }
  };

  searchHandle = event => {
    const len = event.target.value.length;
    if (this.timeout) {
      // console.log("CANCELING TIMEOUT");
      clearTimeout(this.timeout);
    }
    this.setState({
      [event.target.name]: event.target.value
    });
    if (len > 0) {
      this.timeout = setTimeout(() => {
        // console.log("TIMEOUT");
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
      this.props.searchStockList.setSearchStockList(item);
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
      currentStock.expanded = true;
      currentStockList.splice(currentStockIndex, currentStock);
      this.setState({
        selectedStockList: currentStockList
      });
      var data = await fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${currentStock.symbol}`
      );
      data = await data.json();
      currentStock.expanded = true;
      currentStock.data = data;
      currentStockList.splice(currentStockIndex, currentStock);
    }
    this.setState({
      selectedStockList: currentStockList
    });
  };
  expandAllStockData = async () => {
    this.setState({
      expandingAll: true
    });
    var currentStockList = this.state.selectedStockList;
    var newList = [];
    for (var i = 0; i < this.state.selectedStockList.length; i++) {
      var currentStock = currentStockList[i];
      try {
        var data = await fetch(
          `https://financialmodelingprep.com/api/v3/company/profile/${currentStock.symbol}`
        );
        data = await data.json();
        currentStock.data = data;
      } catch (error) {
        console.log(error);
      }
      currentStock.expanded = true;
      newList.push(currentStock);
    }
    this.setState({
      selectedStockList: newList,
      expandingAll: false
    });
  };
  shrinkAllStockData = () => {
    this.setState({
      expandingAll: true
    });
    var currentStockList = this.state.selectedStockList;
    var newList = [];
    for (var i = 0; i < this.state.selectedStockList.length; i++) {
      var currentStock = currentStockList[i];
      currentStock.expanded = false;
      newList.push(currentStock);
    }
    this.setState({
      selectedStockList: newList,
      expandingAll: false
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
            {/* Dumping search match list */}
            {this.state.searchStockList != [] &&
              this.state.searchField &&
              this.state.searchStockList.map(item => (
                <li
                  class="list-group-item search-result-li  justify-content-between align-items-center "
                  onClick={e => this.searchClickHandler(e, item._source.symbol)}
                >
                  <div className="row">
                    {/* Stock Symbol Display */}
                    <div className="col-4">
                      <span
                        class={
                          item.data &&
                          item.data.profile &&
                          item.data.profile.changes > 0
                            ? "badge searchListItem bg-green badge-pill valid-data-high"
                            : item.data &&
                              item.data.profile &&
                              item.data.profile.changes < 0
                            ? "badge searchListItem badge-danger badge-pill valid-data-low"
                            : item.data &&
                              item.data.profile &&
                              item.data.profile.changes == 0
                            ? "badge searchListItem badge-dark badge-pill"
                            : "badge searchListItem badge-light badge-pill invalid-data"
                        }
                      >
                        {item._source.symbol}
                      </span>
                    </div>
                    {/* Stock Price Display */}
                    <div className="col-8 text-right">
                      {item.data &&
                        item.data.profile &&
                        item.data.profile.price}
                    </div>
                  </div>
                  <div className="row">
                    {/* Stock Name Display */}
                    <div className="col-6 ">
                      {item.data &&
                        item.data.profile &&
                        item.data.profile.companyName}
                    </div>
                    {/* Stock Change Display */}
                    <div className="col-6 text-right">
                      {item.data && item.data.profile ? (
                        item.data.profile.changes +
                        item.data.profile.changesPercentage
                      ) : this.state.loadingSearch ? (
                        <div className="data-loader-sm"></div>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="justify-content-around row position-relative">
          {/* Handle expand all and shrink all button */}
          {this.state.selectedStockList.length > 0 && (
            <div className="col-12 text-right selected-stock-options">
              <a onClick={this.expandAllStockData}>Expand Details</a> /{" "}
              <a onClick={this.shrinkAllStockData}> Shrink Details</a>
            </div>
          )}
          {/* Expanding All Loader */}
          {this.state.expandingAll && (
            <div className="w-100 h-100 position-absolute  expanding-all-div">
              <div className="expanding-all-loader"></div>
            </div>
          )}
          {/* Dumping the selected stock list */}
          {this.state.selectedStockList.map(item => (
            <div className="col-lg-6 col-6 py-3 px-2 px-lg-3 ">
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
                {/* dumping and expanding information about selected stocks */}
                {item.expanded && (
                  <div class="card-body stock-card-body py-1 text-center ">
                    {/* actual dumping of information */}
                    {item.data && item.data.profile ? (
                      <div>
                        <div className="row py-1">
                          <div className="col-12">
                            <a href={item.data.profile.website} target="_blank">
                              {item.data.profile.companyName}
                            </a>
                          </div>
                        </div>
                        <div className=" row py-1 middle-data">
                          <div className="col-6 px-0">
                            ${item.data.profile.price}
                          </div>
                          <div className="col-6 px-0">
                            {item.data.profile.changesPercentage}
                          </div>
                        </div>
                        <div className="row py-1">
                          <div className="col-12">
                            <a
                              href={`https://www.google.com/search?q=${item.data
                                .profile.industry +
                                " " +
                                item.data.profile.sector}`}
                              target="_blank"
                            >
                              {item.data.profile.industry}
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : item.data && !item.data.profile ? (
                      // Case 1: No Data coming through
                      <div className="text-center">
                        <span className=" py-1">
                          {" "}
                          No information availlable.
                        </span>
                        <br />
                        <a
                          className="py-1"
                          href={`https://google.com/search?q=${item.symbol}`}
                        >
                          Search <b>{item.symbol}</b> in Google
                        </a>
                      </div>
                    ) : (
                      // Loading circle
                      <div className="data-loader "></div>
                    )}
                  </div>
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
