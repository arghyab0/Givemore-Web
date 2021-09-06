//components
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import { useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Donate from "./pages/Donate";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";

//hoc
import WithAuth from "./hoc/WithAuth";

//redux stuff
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/user.action";

//stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  });

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/register" component={Register} />

          <Route path="/login" component={Login} />

          <Route path="/reset" component={Reset} />

          <Route
            path="/donate"
            render={() => (
              <WithAuth>
                <Donate />
              </WithAuth>
            )}
          />

          <Route exact path="/store" component={Store} />
          <Route path="/store/:filterType" component={Store} />

          <Route path="/product/:productID" component={ProductDetails} />

          <Route
            path="/cart"
            render={() => (
              <WithAuth>
                <Cart />
              </WithAuth>
            )}
          />

          <Route
            path="/shipping"
            render={() => (
              <WithAuth>
                <Shipping />
              </WithAuth>
            )}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
