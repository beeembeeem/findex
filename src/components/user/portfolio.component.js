import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import AddPortfolio from "./addPortfolio.component";
import DeletePortfolio from "./deletePortfolio.component";
import * as subscriptions from "../../graphql/subscriptions";
import { DashboardPortfolios } from "./functions/custom_queries";
import StockListDisplay from "./stockListDisplay.component"
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioList: [],
      redirectToAddPortfolio: false,
      redirectToDeletePortfolio: false,
      portfolioToDelete: undefined,
      fetching:true
    };
    this.getgraph();
  }
  watchDel = async () => {
    console.log("watch graph deletin onnn mate");
    if (this.props.data.isAuthenticated) {
      console.log("vv");
      await API.graphql(
        graphqlOperation(subscriptions.onDeletePortfolio, {
          owner: this.props.data.user.username
        })
      ).subscribe(result => {
        console.log(result);
        console.log("Delete Sync results ^^");
        this.getgraph();
      });
    }
  };
  watchAdd = async () => {
    console.log("watch graph goin onnn mate");
    if (this.props.data.isAuthenticated) {
      await API.graphql(
        graphqlOperation(subscriptions.onCreatePortfolio, {
          owner: this.props.data.user.username
        })
      ).subscribe(result => {
        console.log(result);
        console.log("added Sync results ^^");
        this.getgraph();
      });
    }
  };
  getgraph = async () => {
    if (this.props.data.isAuthenticated) {
      try {
              const result = await API.graphql(graphqlOperation(DashboardPortfolios));
      console.log(result);
      this.setState({
        portfolioList: result.data.listPortfolios.items,
        fetching : false
      });

      } catch (error) {
        console.log(error)
      }
    }
  };

  componentDidMount() {
    this.watchDel();
    this.watchAdd();
  }
  componentDidUpdate() {
    console.log("component did update");
  }
  redirectToAddPortfolio_f = e => {
    this.setState({
      redirectToAddPortfolio: !this.state.redirectToAddPortfolio
    });
  };
  redirectToDeletePortfolio_f = id => {
    this.setState({
      redirectToDeletePortfolio: !this.state.redirectToDeletePortfolio,
      portfolioToDelete: id
    });
  };
  render() {
    if (this.props.data.isAuthenticated) {
      console.log(this.state);
      return (
        <div className={this.props.trigger.slimSide? " portfolio-bg col-12 col-lg-12 order-2 order-md-1" : " portfolio-bg col-12 col-lg-10 order-2 order-md-1"}>
          {this.state.redirectToAddPortfolio && (
            <AddPortfolio
              data={this.props.data}
              work={{ redirectToAddPortfolio_f: this.redirectToAddPortfolio_f }}
            />
          )}
          {this.state.redirectToDeletePortfolio && (
            <DeletePortfolio
              data={this.props.data}
              work={{
                redirectToDeletePortfolio_f: this.redirectToDeletePortfolio_f,
                portfolioToDelete: this.state.portfolioToDelete
              }}
            />
          )}
          <div className="text-dark p-3 portfolio-bg rounded">
            <div className="addButton text-center  rounded">
              <button
                className=" btn-outline-light btn-sm  btn h3 m-0 "
                type=""
                onClick={e => {
                  e.preventDefault();
                  this.redirectToAddPortfolio_f();
                }}
              >
                <h5 className="m-0 plus"> +</h5>
              </button>
            </div>
            <h5 className="text-light ">Portfolios</h5>
            <div className="row p-2">
              {this.state.fetching ? (
                <div className="container text-center text-light portfolio-loader">
                </div>
              ) : this.state.portfolioList.length === 0 ?
              <div className="container text-center text-light ">
                  {" "}
                  <h4>Start by creating a new portfolio</h4>
                </div>
               :(
                this.state.portfolioList.map(item => (
                  <div key={item.id} className="col-12 col-md-6 py-2">
                    <div className="card portfolio">
                      <div className="card-header">
                        <button
                          type="button"
                          className="close"
                          onClick={e => {
                            e.preventDefault();
                            this.redirectToDeletePortfolio_f(item);
                          }}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h6 className="card-header-title"> {item.name}</h6>
                      </div>
                      <div className="card-body">
                        {item.stocks.items.length == 0 || JSON.parse(item.stocks.items[0].symbol).length == 0? (
                          <div className="noEQ">
                            This portfolio has no equities
                          </div>
                        ) : (
                              <StockListDisplay searchStockList = {{
                                selectedStockList : JSON.parse(item.stocks.items[0].symbol)
                              }}/>
                        )}
                        <button className="btn btn-secondary btn-sm py-1">
                          Add Equity
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default Portfolio;
