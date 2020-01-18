import React, { Component } from 'react';

class search extends Component {
  constructor(props) {
    super(props);
    this.tempSearchField = []
        this.state = {
      searchField:"",
      searchStockList: []   
       };
  }
  componentDidMount() {
    this.setState({comment: 'Hello'});
  }
  search = async () => {
    const userinput = "*" + this.state.searchField + "*"
    const query = {  
   "query":{  
      "query_string":{  
         "fields":["symbol^2", "name"],
         "query": userinput
      }
   },
  "size": 500
}

  console.log(query)
    try {
      const result = await global.fetch("https://search-financeweb-xmgf4biyujgrl4xi256rrdjwau.us-east-1.es.amazonaws.com/stocks/equi/_search",
      {
        "method" : "POST",
        "headers": {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      "body" : JSON.stringify(query)
      })
      const json = await result.json()
      console.log(json)
      this.setState({
        searchStockList:json.hits.hits,
        tempSearchField : json.hits.hits
      })
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
    if ( len > 0) {
      this.timeout = setTimeout(() => {
        console.log("TIMEOUT");
        this.setState({
          searchStockList:this.tempSearchField
        })
        this.search();
      }, 200);
    }
  };

  render() {
  
    return (
    <div className="w-100 pr-2">        
      <input className="form-control w-100 pr-2 d-inline form-control-dark" type="text" autocomplete="off"
                type="search" name="searchField" placeholder="Find Portfolios, Equities, or Profiles" onChange ={
        this.searchHandle
      }/>
      <div className="search-parent">
                                  <ul class="list-group search-list position-absolute mt-2 w-100 px-1">

                {this.state.searchStockList != [] && this.state.searchField&&
                  this.state.searchStockList.map(item => (
                    <li class="list-group-item search-result-li d-flex justify-content-between align-items-center ">
                    
                    {item._source.name }
                                            <span class="badge badge-primary badge-pill">{item._source.symbol }</span>

                    </li>
                  ))}
              </ul></div>

</div>
    );
  }
}

export default search