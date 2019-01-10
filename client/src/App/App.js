import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Poll from './pages/poll';

class App extends Component {
  render() {
    const App = () => (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/poll' component={Poll}/>
        </Switch>
    )
    return (
      <div>
      <Switch>
        <App/>
      </Switch>
      <footer>
        <p>
          SPSSA-19 聖保祿學校中學學生會 <br/>
          Address: Rampa Dos Cavaleiros, No. 12-14 Macau
          <br/><br/>
          <br/><br/>
          <br/><br/>
          Made my etblh, truco
        </p>
      </footer>
      </div>
    );
  }
}

export default App;