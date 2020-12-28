import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </div>
    );
  }
}

export default App;
