//components
import { Route, Switch, Redirect } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import React, { Component } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";

//utils
import { auth, handleUserProfile } from "./firebase/utils";

//stylesheets
import "./default.scss";

const initialState = {
  currentUser: null,
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: { id: snapshot.id, ...snapshot.data() },
          });
        });
      }

      this.setState({
        ...initialState,
      });
    });
  }

  componentWillUmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Header currentUser={currentUser} />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />

            {currentUser ? (
              <Redirect to="/" />
            ) : (
              <Route path="/register" component={Register} />
            )}

            {currentUser ? (
              <Redirect to="/" />
            ) : (
              <Route path="/login" component={Login} />
            )}

            <Route exact path="/reset" component={Reset} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
