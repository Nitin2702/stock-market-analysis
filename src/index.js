import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Stats from './Stats';
import NotFound from './NF';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

ReactDOM.render(
    <Router basename="stock-market-analysis">
    <Switch>
    <Route path="/" exact component={App}/>
    <Route path="/stats/:name" component={Stats}/>
    <Route component={NotFound}/>
    </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
