import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute, Link } from "react-router";

import Container from "./components/container";
import Color from "./pages/color/question";
import "./index.less";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Container}>
      <IndexRoute component={Color} />
      <Route path="color" component={Color} />
    </Route>
  </Router>,
  document.getElementById("root")
);
