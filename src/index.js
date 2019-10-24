import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './pages/app';

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
      <Route path='/' component={App}/>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
