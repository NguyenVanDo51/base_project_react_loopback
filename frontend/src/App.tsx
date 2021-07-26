import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import RootLayout from "./layouts/RootLayout/RootLayout";
import Login from "./pages/users/login/Login";
import store, { persistor } from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
          <Switch>
            <Route exact path="/" component={RootLayout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/projects" component={RootLayout} />
            <Route exact path="/projects/:project_id" component={RootLayout} />
          </Switch>
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;