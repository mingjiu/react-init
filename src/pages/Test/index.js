import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { clickPlusRightNow, clickPlusAsync } from '../../actions/app'
import styles from  './index.module.css'
console.log(styles)

@connect(({
  app
}) => {
  return {
    app
  }
})
class Test extends React.Component{

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
    return <div className={styles.test}>
      你点击了 {clickCount} 次<br />
      <Button onClick={handleClick.bind(this)}>+1</Button>
      <Button onClick={handleClick1.bind(this)} disabled={uiState.isLoading}>+1 async</Button>
      <br />
      <Link to='/page'>to /Page</Link>
    </div>
  }
}
export default Test
