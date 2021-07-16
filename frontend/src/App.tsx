import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout";
import Login from "./pages/users/login/Login";
import Signup from "./pages/users/login/SignUp";
import store from './redux/store';

export default function BasicExample() {
  return (
    <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path="/" component={RootLayout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
      </Router>
    </Provider>
  );
}
