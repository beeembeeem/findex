import React, { Component } from "react";

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
    this.setState({ comment: "Hello" });
  }
  search = async () => {
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

    console.log(query);
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
      console.log(json);
      this.getSearchChanges(json.hits.hits);
    } catch (error) {
      console.log(error);
    }
  };
  getSearchChanges = async currentSearchList => {
    var first = true;
    var second = false;

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
      console.log(data);
      console.log(currentStock);
      console.log(currentSearchList);
    }

    this.setState({
      searchStockList: currentSearchList
    });
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
      }, 100);
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="w-100 pr-2">
        <input
          className="form-control w-100 pr-2 d-inline form-control-dark"
          type="text"
          autocomplete="off"
          type="search"
          name="searchField"
          placeholder="Find Portfolios, Equities, or Profiles"
          onChange={this.searchHandle}
        />
        <div className="search-parent">
          <ul class="list-group search-list position-absolute mt-2 w-100 px-1">
            {this.state.searchStockList != [] &&
              this.state.searchField &&
              this.state.searchStockList.map(item => (
                <li class="list-group-item search-result-li  justify-content-between align-items-center ">
                  <div class="d-block ">
                    <span
                      class={
                        item.data &&
                        item.data.profile &&
                        item.data.profile.changes > 0
                          ? "badge searchListItem badge-success badge-pill valid-data-high"
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
                    <span>
                      <p className="search-p m-0">{item._source.name}</p>
                    </span>
                    <span className="search-number-holder text-right">
                      <p className="m-0">
                        {item.data && item.data.profile ? (
                          item.data.profile.price
                        ) : (
                          <div className="data-loader-sm "></div>
                        )}
                      </p>
                      <p className="m-0">
                        {item.data && item.data.profile ? (
                          item.data.profile.changes +
                          " " +
                          item.data.profile.changesPercentage
                        ) : (
                          <div className="data-loader-sm "></div>
                        )}
                      </p>
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default search;
