import React, { Component } from 'react';
import  { Auth, API, graphqlOperation } from 'aws-amplify';
import navbarSettings from "../../settings/navbar";
import { Link } from 'react-router-dom';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {portfolioList : []};
    this.navbar = navbarSettings.items_auth

  }

  componentDidMount(){

}
   componentDidUpdate(){
  }


  render() {
    if (this.props.data.isAuthenticated){
        return (
          <div className="col-md-4 col-12 order-1 order-md-2">
            <div className="text-dark col-sm-12 p-3 border border-dark rounded"> 
              <h5 className="text-light ">Overview</h5>
              <div className = "row m-0">
              <div className= "profile col-12">
              asdasd
              </div>
              </div>
          </div>
           </div>
          );
    }
    else{
        return(
            <p>Loading...</p>
        )
    }
  }
}

export default profile