import React, { Component } from "react";
import Navbar from "../navbar.component";
import { Auth } from "aws-amplify";
// Recieves alert={text:"value"} az prop
export default class topletalert extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
return(
          <div className="top-left-alert ">
      <div class="alert alert-danger top-left-alert-inner" role="alert">
    {this.props.alert && this.props.alert.text}
</div>
      </div>

)
    }
  }
