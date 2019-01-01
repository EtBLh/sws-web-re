import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import List from './pages/list';

class App extends Component {
  render() {
    const App = () => (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
        </Switch>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;