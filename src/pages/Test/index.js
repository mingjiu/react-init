import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import i18next from 'i18next'
import { withTranslation } from 'react-i18next'
import { Button } from 'antd'
import { clickPlusRightNow, clickPlusAsync } from '../../actions/app'
import styles from  './index.scss'

@withTranslation(['trans'])
@connect(({
  app
}) => {
  return {
    app
  }
})
class Test extends React.Component{
  state = {
    language: ['zh', 'en']
  }

  componentDidMount () {
    console.log(this.props, i18next)
  }

  handleClick () {
    this.props.dispatch(clickPlusRightNow())
  }

  handleClick1 () {
    this.props.dispatch(clickPlusAsync())
  }

  languageChange () {
    this.setState({
      language: this.state.language.reverse()
    })
    i18next.changeLanguage(this.state.language[0])
  }
  
  render () {
    let { t } = this.props
    let { clickCount, uiState } = this.props.app
    let { handleClick, handleClick1, languageChange } = this
    return <div className={styles.test}>
      {t('testTrans')} {clickCount} 次<br />
      <Button onClick={handleClick.bind(this)}>+1</Button>
      <Button onClick={handleClick1.bind(this)} disabled={uiState.isLoading}>+1 async</Button>
      <br /><br /><br />
      <Button onClick={languageChange.bind(this)}>{t('changeLanguage')}</Button><br />
      <div>{t('test1')}</div>
      <br /><br />
      <Link to='/page'>to /Page</Link>
    </div>
  }
}
export default Test
