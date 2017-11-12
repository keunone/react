/**
*
* Alert
*
*/

import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { doClearMessage } from '../../containers/App/actions'
// import styled from 'styled-components'


class Alert extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(doClearMessage())
    }, 2000)
  }

  checkError() {
    const error = this.props.message
    if (error instanceof Object) {
      if (error.message) {
        return error.message
      }
    }
    return error.toString()
  }

  render() {
    const { type } = this.props
    const message = this.checkError()
    return (
      <div>
        <div className={classnames({ [style.customError]: type === 'error', [style.customWarn]: type === 'warn', [style.customSuccess]: type === 'success' })}>
          {message}
        </div>
      </div>
    )
  }
}

export default Alert
