import React, { Component } from "react";

export default class dumper extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  async componentDidMount() {
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
  render() {
    return (
      <div className="row mx-0 mainbg px-4 py-4 rounded">
        <div className="col-12 mx-0">
          <h5>Today's Most Active</h5>
        </div>
        {this.state.activeList &&
          this.state.activeList.map(item => (
            <div className="col-lg-4  col-6 py-3 px-2 px-lg-3 ">
              <a href={`/equ/${item.ticker}`}>
                <div
                  className={
                    item.changes > 0
                      ? "card text-white bg-green "
                      : item.changes < 0
                      ? "card text-white bg-danger "
                      : "card text-white bg-secondary "
                  }
                >
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
                    <div className="col-12  px-0 d-flex justify-content-around ">
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
              </a>
            </div>
          ))}

          {/* Gainer Dump */}

          <div className="col-12 mx-0">
          <h5>Today's Most Gainers </h5>
        </div>
        {this.state.activeList &&
          this.state.gainerList.map(item => (
            <div className="col-lg-4  col-6 py-3 px-2 px-lg-3 ">
              <a href={`/equ/${item.ticker}`}>
                <div
                  className={
                    item.changes > 0
                      ? "card text-white bg-green "
                      : item.changes < 0
                      ? "card text-white bg-danger "
                      : "card text-white bg-secondary "
                  }
                >
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
                    <div className="col-12  px-0 d-flex justify-content-around ">
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
              </a>
            </div>
          ))}
      </div>
    );
  }
}
