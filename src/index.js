import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Greeting} from './views'

import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom'

ReactDOM.render(
    <Router>
      <Switch>
          <Route path='/' component={Greeting} exact/>
          <Route path='/app' component={App}/>

      </Switch>
    </Router>,
    document.getElementById('root')
);
