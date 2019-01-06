import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import List from './pages/list';
import Poll from './pages/poll';

class App extends Component {
  render() {
    const App = () => (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/poll' component={Poll}/>
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