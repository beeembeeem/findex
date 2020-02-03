import React, { Component } from 'react';
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations"

class DeletePortfolio extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  deletePortfolio = async(e) =>{
    e.preventDefault()
        if(this.props.data.isAuthenticated){
          const result = await API.graphql(graphqlOperation(mutations.deletePortfolio,{input:{id:this.props.work.portfolioToDelete.id}}))
            // console.log("Deleted Portfolio succesfully")
            this.props.work.redirectToDeletePortfolio_f()
          }
        }
  render() {
    return (
    <div className="addPortfolioModal"> 
    <div className="addPortfolioInner card">
    <div className="card-header ">
    <h5 className="card-header-title">Delete a Portfolio</h5>
        <button type="button" className="close" onClick = {this.props.work.redirectToDeletePortfolio_f}>
  <span aria-hidden="true">&times;</span>
</button>
</div>
    <form className="card-body text-center ">
<div className="alert alert-danger" role="alert">
  You are about to delete the <b>{this.props.work.portfolioToDelete.name}</b> portfolio!</div>
  <button type="submit" className="btn btn-danger mx-3" onClick = {this.deletePortfolio}>Delete</button>
    <button type="submit" className="btn btn-dark mx-3" onClick = {this.props.work.redirectToDeletePortfolio_f}>Cancel</button>

</form>
    </div>
    </div>
    );
  }
}

export default DeletePortfolio