import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/signup.component";
import Index from "./components/index.component";
import Signin from "./components/signin.component";
import notFound from "./components/404.component";
import Signout from "./components/signout.component";
import { Auth } from "aws-amplify";
import EQU from "./components/EQU.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: false,
      user: null
    };
  }
  //general parent state setter to be passed on
  setSomeState = some => {
    this.setState(some);
  };

  //handle authentication using AWS cognito through Amplify
  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setSomeState({
        user: user,
        isAuthenticated: true
      });
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }
  }

  render() {
    //build the authentication object to pass along
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setSomeState: this.setSomeState
    };

    return (
      !this.state.isAuthenticating && (
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(...props) => <Index data={authProps} />}
            />
            <Route
              exact
              path="/signout"
              render={(...props) => <Signout data={authProps} />}
            />
            <Route
              exact
              path="/signup"
              render={(...props) => <Signup data={authProps} />}
            />
            <Route
              exact
              path="/equ/:stockProfile"
              render={(...props) => <EQU data={authProps} />}
            />
            <Route
              exact
              path="/signin"
              render={(...props) => <Signin data={authProps} />}
            />
            <Route
              
              path="/"
              render={(...props) => <Index data={authProps} />}
            />{" "}
          </Switch>
        </Router>
      )
    );
  }
}

export default App;
