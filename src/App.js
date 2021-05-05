import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Starred from "./pages/Starred";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/starred">
          <Starred />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
