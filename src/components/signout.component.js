import React, { Component } from 'react';
import  { Auth } from 'aws-amplify';

class signout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        signedout: false
    }
  }
  componentDidMount() {
      this.handleLogOut()
  }

  handleLogOut = async event => {
    try {
      Auth.signOut();
      this.setState({
          signedout : true
      })
    this.props.data.setSomeState({
      user: null,
      isAuthenticated:false
    })
    window.location.href = '/'
    }catch(error) {
      console.log('error')
      console.log(error.message);
    }
  }
  render() {
      if ( this.state.signedout){
        return (
            <div className="container"> <h1 className="pt-3 text-light">Redirecting...</h1></div>
            );    }
    return (
    <div className="container"> <h1 className="pt-3 text-light">Signing out...</h1></div>
    );
  }
}

export default signout