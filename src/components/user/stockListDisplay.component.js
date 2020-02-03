import React, { Component } from 'react';
import { Auth, API, graphqlOperation } from "aws-amplify";

class stockListDisplay extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.searchStockList.selectedStockList)
    this.state = {selectedStockList: this.props.searchStockList.selectedStockList};
  }


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
      // console.log(data);
      // console.log(currentStock);
      currentStock.expanded = true;
      currentStock.data = data;
      currentStockList.splice(currentStockIndex, currentStock);
    }
    this.setState({
      selectedStockList: currentStockList
    });
  };
  expandAllStockData = async () => {
    // console.log("expanding");
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
        // console.log(data);
        currentStock.data = data;
      } catch (error) {
        console.log(error);
      }
      currentStock.expanded = true;
      newList.push(currentStock);
    }
    // console.log(newList);
    this.setState({
      selectedStockList: newList,
      expandingAll: false
    });
  };
  shrinkAllStockData = () => {
    // console.log("expanding");
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
    // console.log(newList);
    this.setState({
      selectedStockList: newList,
      expandingAll: false
    });
  };
  render() {
    return (
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
            <div className="col-lg-4  col-6 py-3 px-2 px-lg-3 ">
              <div className="card text-white bg-primary">
                <div className="card-header text-center">
                  {/* MAIN SIGN */}
                  <span className="badge badge-light text-dark badge-pill ">
                    {item.symbol}
                  </span>
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
    );
  }
}

export default stockListDisplay