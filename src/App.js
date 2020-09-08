import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Marketplace from './components/Marketplace';
import NotFound from './components/NotFound';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {    
    return (
      <Router>
        <div className="App">
          <TopNavBar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/marketplace/:campus" component={Marketplace}/>
            <Route default component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

