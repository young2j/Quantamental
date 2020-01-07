import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App';
import {Greeting} from './views'
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
            <Route path='/greeting' component={Greeting}/>
            <Route path='/' component={App}/>

        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root')
);
