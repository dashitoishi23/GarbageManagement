import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
     
       <Router>
          <div className="App">
            <Route exact path="/" component = { SignUp } />
            <Route exact path="/login" component = { Login } />
            <Route exact path="/dashboard" component = { Dashboard } />
            <Route exact path="/search" component = { Search } />
          </div>
       </Router>
      
    );
  }
}

export default App;
 