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

//redux stuff
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user.action";

//utils
import { auth, handleUserProfile } from "./firebase/utils";

//stylesheets
import "./default.scss";

export class App extends Component {
  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Header />
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

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
