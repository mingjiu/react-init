import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './pages/App';
import Page from './pages/Page'

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route path='/page' component={Page}/>
      <Route path='/' component={App}/>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
