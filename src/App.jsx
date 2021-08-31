//libs, pkgs
import { Route, Switch } from "react-router";

//components, pages
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
