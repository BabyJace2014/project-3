import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Club from './pages/Club';
import Create from './pages/Create';
import Join from './pages/Join';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return (
      <Router>
    <div>
      
      <Switch>
        <Route exact path="/" component={Club} />
        <Route exact path="/club" component={Club}/>
        <Route exact path="/create" component={Create} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/profile" component={Profile} />
        </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
