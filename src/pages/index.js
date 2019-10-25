import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { store } from '../store'
import Test from './Test'
import Page from './Page'
import { setAntdLocale } from '../utils/i18n'

export default function App () {
  return (
    <Provider store={store}>
      <ConfigProvider locale={setAntdLocale('zh-TW')}>
        <BrowserRouter>
          <Switch>
            <Route path='/page' component={Page}/>
            <Route path='/' component={Test}/>
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  )
}