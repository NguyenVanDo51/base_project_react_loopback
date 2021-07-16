import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

const RootRouter = () => {

  return (
    <Router>
      <Switch>
        <Route path="login">
          <Home />
        </Route>
        <Route path="signup">
          <About />
        </Route>
      </Switch>
    </Router>
  )
}

export default RootRouter;