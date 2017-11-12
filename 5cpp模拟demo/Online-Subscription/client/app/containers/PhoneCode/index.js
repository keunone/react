import 'babel-polyfill'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import injectReducer from 'utils/injectReducer'
// import injectSaga from 'utils/injectSaga'
import { doSendPhone } from './actions'
import reducer from './reducer'
// import saga from './saga'
import { makeSelectPhone, makeSelectCode, makeSelectExp, makeSelectToken } from './selectors'
import IconContainer from '../../components/IconContainer'
import style from './style.scss'

class PhoneCode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flag: false,
      message: '发送验证码',
      codeBorder: true,
      isMounted: false
    }

    this.handleSubmitCode = this.handleSubmitCode.bind(this)
  }

  componentWillMount() {
    // Can only update a mounted or mounting component.
    // This usually means you called setState() on an unmounted component. This is a no-op.
    this.state.isMounted = true
    this.state.codeBorder = this.props.codeBorder

    // let phoneRules = getCommonDecorator(true, 'phone').rules;
    this.phoneDecorator = this.props.form.getFieldDecorator('phone', {
      initialValue: this.props.phone,
      rules: [{
        required: true,
        message: 'the value is required'
      }, {
        pattern: /^[0-9]{11}$/,
        message: 'The input is not valid phone!'
      }]
    })
    this.codeDecorator = this.props.form.getFieldDecorator('code', {
      initialValue: this.props.code,
      rules: [{
        required: true,
        message: 'the value is required'
      }]
    })
  }

  componentWillUnmout() {
    this.setState({ isMounted: false })
  }

  // 定时器
  CountTimer = (count) => {
    if (this.state.isMounted) {
      this.setState({
        flag: true,
        message: `重新发送${count}秒`
      })

      const that = this
      const timer = setInterval(() => {
        count = count - 1
        that.setState({
          flag: true,
          message: `重新发送${count}秒`
        })
        if (count === 0) {
          clearInterval(timer)
          that.setState({
            flag: false,
            message: '发送验证码'
          })
        }
      }, 1000)
    }
  }

  handleSubmitCode(e) {
    e.preventDefault()

    const phone = this.props.form.getFieldValue('phone')

    if (phone !== undefined && this.props.form.getFieldError('phone') === undefined) {
      const count = 60
      this.CountTimer(count)

      this.props.onSendPhone(phone)
    } else {
      return ''
    }
  }


  render() {
    const phoneError = this.props.form.getFieldError('phone')
    return (
      <div>
        <IconContainer show={this.props.phoneCheck} type={phoneError ? 'warn' : 'success'}>
          {this.phoneDecorator(<input
            type="text"
            placeholder="手机号码"
            className={`${style.input} ${style.number} ${phoneError === undefined ? '' : style.border}`} />)}
        </IconContainer>
        {this.codeDecorator(
          <input
            type="text"
            placeholder="手机验证码"
            className={`${style.input} ${style.code} ${this.props.codeBorder === true ? style.border : ''}`}
            onChange={() => this.props.onChangeCode()} />
        )}
        <button className={`${style.button} btn btn-info`} disabled={this.state.flag} onClick={this.handleSubmitCode}>{this.state.message}</button>
      </div>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  phone: makeSelectPhone(),
  code: makeSelectCode(),
  exp: makeSelectExp(),
  token: makeSelectToken()
})

const mapDispatchToProps = (dispatch) => ({
  onSendPhone: (phone) => dispatch(doSendPhone(phone)),
  dispatch
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'authCode', reducer })

// const withSaga = injectSaga({ key: 'authCode', saga })

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(PhoneCode)

