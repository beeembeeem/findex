import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

class search extends Component {
  constructor(props) {
    super(props);
    this.tempSearchField = [];
    this.state = {
      searchField: "",
      searchStockList: []
    };
  }
  componentDidMount() {
  }
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
    if (this.state.searchField.length < 5) {
      fields = ["symbol^2", "name"];
    } else {
      fields = ["symbol", "name"];
    }
    const query = {
      query: {
        query_string: {
          fields: fields,
          query: userinput
        }
      },
      size: 30
    };
    // Fetch Data from ElasticSearch
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
      this.getSearchChanges(json.hits.hits);
    } catch (error) {
      console.log(error);
    }
  };

  // Get stock information about search results
  getSearchChanges = async currentSearchList => {
    var first = true;
    var second = false;
  // Display the first 5, then procced to the rest
    for (let i = 0; i < currentSearchList.length; i++) {
      if (first) {
        if (i > 5) {
          first = false;
        }
      } else if (!second) {
        this.setState({
          searchStockList: currentSearchList
        });
        second = true;
      }

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
      searchStockList: currentSearchList
    });
  };

  // Handle search and timing out when user is not typing
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
      }, 300);
    }
  };
  // Handler click on search item
  searchClickHandler = (e, item) => {
    const itemString = JSON.stringify(item);
    // console.log(itemString)
    this.setState({
      searchField: ""
    });
    this.props.history.push({
      pathname: `/equ/${item._source.symbol}`,
      state: item.data
    });
  };
  render() {
    // console.log(this.state);
    return (
      <div className="col-12 px-0">
        <input
          className="form-control col-12  d-inline form-control-dark"
          type="text"
          autocomplete="off"
          type="search"
          name="searchField"
          placeholder="Find Portfolios, Equities, or Profiles"
          onChange={this.searchHandle}
        />
        <div className="search-parent">
          <ul class="list-group search-list">
            {/* TEST UNIT FOR LI */}
            {/* <li class="list-group-item search-result-li  justify-content-between align-items-center ">
              {" "}
              TEST
            </li> */}
            {/* Dumping search match list */}
            {this.state.searchStockList != [] &&
              this.state.searchField &&
              this.state.searchStockList.map(item => (
                <li
                  class="list-group-item search-result-li  justify-content-between align-items-center "
                  onClick={e => this.searchClickHandler(e, item)}
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
                      )}{" "}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(search);
