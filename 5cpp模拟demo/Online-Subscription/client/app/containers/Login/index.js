import { connect } from 'react-redux'
import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
// import injectSaga from 'utils/injectSaga'
import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createForm } from 'rc-form'
import messages from './messages'
import style from './style.scss'
import { doLogin, doLoginOut } from './action'
// import saga from './saga'
import reducer from './reducer'
import UserInfo from '../../components/UserInfo'
import { makeSelectLoading, makeSelectError, makeSelectUserInfo } from './selectors'
import IconContainer from '../../components/IconContainer'

import { doSetMessage } from '../App/actions'

class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      passwordCheckRender: true,
      emailCheckRender: true
    }
  }

  componentWillMount() {
    this.passwordDecorator = this.props.form.getFieldDecorator('password', {
      initialValue: '',
      onChange: this.showEmailCheck,
      rules: [{
        required: true,
        message: '密码不能为空',
      }, {
        min: 8,
        max: 16,
        message: '密码填写需要8-16位'
      }],
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const { email, password } = this.props.form.getFieldsValue()

    this.props.form.validateFields((error) => {
      if (error) {
        return false
        // this.props.onSetMessage('格式错误', 'error') // error success warn
      } else {
        this.props.onLogin(email, password)
        // if (this.props.error === 500) {
        //   this.props.onSetMessage('密码错误', 'error')
        // }
      }
    })
  }

  showPasswordCheck = () => {
    this.setState({
      passwordCheckRender: false
    })
  }
  showEmailCheck = () => {
    this.setState({
      emailCheckRender: false
    })
  }

  render() {
    const { formatMessage } = this.props.intl
    const { getFieldError, getFieldProps } = this.props.form
    const passwordErrors = getFieldError('password')
    const emailErrors = getFieldError('email')
    console.log(`${passwordErrors}***`)
    if (this.props.userInfo.get('email') === '' && this.props.userInfo.get('password') === '') {
      return (
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className={`${style.hiddenSm} ${style.formGroupReset} form-group`}>
            <IconContainer inside show={!this.state.passwordCheckRender} type={emailErrors ? 'warn' : 'success'}>
              <input
                type="email"
                className="form-control"
                {...getFieldProps('email', {
                  initialValue: '',
                  onChange: this.showPasswordCheck,
                  rules: [{
                    required: true,
                    message: '邮箱必填'
                  }, {
                    type: 'email',
                    message: '邮箱格式不正确'
                  }]
                })}
                placeholder={formatMessage(messages.email)} />
            </IconContainer>
            <div className="error-message">
              {emailErrors ? emailErrors.join(',') : null}
            </div>
          </div>
          <div className={`${style.hiddenSm} ${style.formGroupReset} form-group`}>
            <IconContainer inside show={!this.state.emailCheckRender} type={passwordErrors ? 'warn' : 'success'}>
              {this.passwordDecorator(
                <input
                  type="password"
                  className="form-control"
                  placeholder={formatMessage(messages.password)}
                />
              )}
            </IconContainer>
            <div className="error-message">
              {passwordErrors ? passwordErrors.join(',') : null}
            </div>
          </div>

          <button type="submit" value="Submit" className={`${style.hiddenSm} ${style.loginButton} btn`}>
            <FormattedMessage {...messages.login} />
          </button>
          {/* <span style={{ color: 'white' }}>{this.props.error}</span> */}
        </form>
      )
    } else {
      return (
        <div className="row">
          <UserInfo userInfo={this.props.userInfo} />
          <div className="col-6">
            <button onClick={this.props.onLoginOut} className={`${style.loginButton} btn`}>退出登录</button>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = () => createStructuredSelector({
  isLoading: makeSelectLoading(),
  error: makeSelectError(),
  userInfo: makeSelectUserInfo(),
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: (email, password) => dispatch(doLogin(email, password)),
  onLoginOut: () => dispatch(doLoginOut()),
  onSetMessage: (msg, type) => dispatch(doSetMessage(msg, type)),
})


const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'login', reducer })

// const withSaga = injectSaga({ key: 'login', saga })

const wrappedLogin = createForm()(Login)

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(injectIntl(wrappedLogin))

