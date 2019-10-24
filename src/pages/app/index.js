import React from 'react';
import { connect } from 'react-redux'
import { setHomeUIState } from '../../actions/app'
import './index.css';

@connect(({
  app
}) => {
  return {
    app
  }
})
class App extends React.Component{

  componentDidMount () {
    console.log(123)
  }

  render () {
    return <div>123123</div>
  }
}
export default App
