import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { store } from './store'
import Test from './pages/Test'
import Page from './pages/Page'

import './sass/index.scss'

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route path='/page' component={Page}/>
      <Route path='/' component={Test}/>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
