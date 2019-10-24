import React from 'react';
import { connect } from 'react-redux'
import { clickPlusRightNow, clickPlusAsync } from '../../actions/app'
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
    console.log(this.props)
  }

  handleClick () {
    this.props.dispatch(clickPlusRightNow())
  }

  handleClick1 () {
    this.props.dispatch(clickPlusAsync())
  }
  
  render () {
    let { clickCount, uiState } = this.props.app
    let { handleClick, handleClick1 } = this
    return <div>
      你点击了 {clickCount} 次<br />
      <button onClick={handleClick.bind(this)}>+1</button>
      <button onClick={handleClick1.bind(this)} disabled={uiState.isLoading}>+1 delay</button>
    </div>
  }
}
export default App
