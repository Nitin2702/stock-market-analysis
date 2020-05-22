import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NotFound from './NF';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

ReactDOM.render(
    <Router>
    <Switch>
    <Route path="/" exact component={App}/>
    <Route component={NotFound}/>
    </Switch>
    </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();