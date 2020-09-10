import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Marketplace from './components/Marketplace';
import SellHome from './components/Sell/SellHome';
import NotFound from './components/NotFound';
import { withAuthentication } from './components/Session';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <div className="App">
      <TopNavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/marketplace/:campus" component={Marketplace} />
        <Route exact path="/sell" component={SellHome}/>
        <Route default component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default withAuthentication(App);

