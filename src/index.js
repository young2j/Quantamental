import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Greeting} from './views'

import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'

ReactDOM.render(
    <Router>
      <Switch>
          <Route path='/greeting' component={Greeting}/>
          <Route path='/' component={App}/>

      </Switch>
    </Router>,
    document.getElementById('root')
);
