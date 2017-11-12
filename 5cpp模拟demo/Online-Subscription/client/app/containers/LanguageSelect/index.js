/**
 *
 * LanguageSelect
 *
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import classnames from 'classnames'
import { appLocales } from '../../i18n'
import style from './style.scss'
import { changeLocale } from '../LanguageProvider/actions'
import { makeSelectLocale } from '../LanguageProvider/selectors'


class LanguageSelect extends Component {
  constructor(props) {
    super(props)
    console.log('props local', props.locale)
    const { locale } = props
    this.state = {
      curLanguage: locale, // 当前所在位置
    }
  }

  doChangeState(key) {
    this.setState({
      curLanguage: key
    }, () => {
      console.log('key', this.state.curLanguage)
      // setTimeout(() => this.props.onChangeLanguage(key))
      // this.props.onChangeLanguage(key)
    })
  }


  render() {
    console.info('render', this.state.curLanguage)
    const nameData = {
      en: 'English',
      zh: '中文',
    }
    return (
      <div className={`${style.languageSelect}`}>
        <button className={`btn ${style.languageList}`}>
          {appLocales.map((language, key) => (
            <span className = {classnames({ [style.cur]:this.state.curLanguage === language })} key = {key} onClick={() => {
              this.doChangeState(language)
              this.props.onChangeLanguage(language)
            }}>{nameData[language]}</span>
          ))}
        </button>
      </div>
    )
  }
}


const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale()
})

function mapDispatchToProps(dispatch) {
  return {
    onChangeLanguage: (language) => {
      dispatch(changeLocale(language))
    },
    dispatch,
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
)(LanguageSelect)
