import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { createForm } from 'rc-form'
import injectReducer from 'utils/injectReducer'
// import injectSaga from 'utils/injectSaga'
import { doValidateCode } from './actions'
// import saga from './saga'
import reducer from './reducer'
import { makeSelectEmail, makeSelectPassword, makeSelectAuthCode } from './selectors'
import IconContainer from '../../components/IconContainer'
import PhoneCode from '../../containers/PhoneCode'
import ControllerButton from '../../components/ControllerButton'
import style from './style.scss'

class PersonalInfo extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      emailCheck: false,
      affirmEmailCheck: false,
      sameEmail: false,
      passwordCheck: false,
      affirmPasswordCheck: false,
      samePassword: false,
      phoneCheck: false,
      codeBorder: false
    }

    this.handleChangeState = this.handleChangeState.bind(this)
    this.handleSameValue = this.handleSameValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { getFieldDecorator } = this.props.form

    this.emailDecorator = getFieldDecorator('email', {
      initialValue: this.props.email,
      rules: [{
        required: true,
        message: '邮箱必填'
      }, {
        type: 'email',
        message: '请输入正确的邮箱格式'
      }]
    })
    this.affirmEmailDecorator = getFieldDecorator('affirmEmail', {
      initialValue: this.props.email,
      rules: [{
        required: true,
        message: '邮箱必填'
      }, {
        type: 'email',
        message: '请输入正确的邮箱格式'
      }]
    })
    this.passwordDecorator = getFieldDecorator('password', {
      initialValue: this.props.password,
      rules: [{
        required: true,
        message: '密码不能为空'
      }, {
        pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,16}$/,
        message: '请输入正确的密码格式'
      }]
    })
    this.affirmPasswordDecorator = getFieldDecorator('affirmPassword', {
      initialValue: this.props.password,
      rules: [{
        required: true,
        message: '确认密码不能为空'
      }, {
        pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,16}$/,
        message: '请输入正确的密码格式'
      }]
    })
  }

  handleChangeState(param, flag) {
    return new Promise((resolve) => {
      this.setState({
        [param]: flag
      })
      resolve
    })
  }

  // e：目标对象
  // param：想要对比的（输入框）的字段名
  // field：输入框的对应的state字段名
  handleSameValue(e, param, field) {
    const key = this.props.form.getFieldsValue()[param]
    const value = e.target.value.trim()
    if (key === value) {
      this.handleChangeState(field, true)
    } else {
      this.handleChangeState(field, false)
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const { getFieldsValue, validateFields } = this.props.form
    const { email, affirmEmail, password, affirmPassword, phone, code } = getFieldsValue()
    const exp = this.props.authCode.get('exp')
    const token = this.props.authCode.get('token')
    let flag = true

    if (email === '') {
      this.handleChangeState('emailCheck', true)
    }
    if (affirmEmail === '') {
      this.handleChangeState('affirmEmailCheck', true)
    }
    if (password === '') {
      this.handleChangeState('passwordCheck', true)
    }
    if (affirmPassword === '') {
      this.handleChangeState('affirmPasswordCheck', true)
    }
    if (phone === '') {
      this.handleChangeState('phoneCheck', true)
    }
    if (code === undefined || code === '') {
      this.handleChangeState('codeBorder', true)
    }

    validateFields((error, value) => {
      if (error !== null) {
        flag = false
      } else if (value.email !== value.affirmEmail) {
        flag = false
      } else if (value.password !== value.affirmPassword) {
        flag = false
      } else {
        flag = true
      }
    })

    // email、password、phone、code
    if (flag) {
      this.props.onValidateCode({ phone, code, exp, token, email, password })
    } else {
      return ''
    }
  }

  render() {
    const { getFieldError } = this.props.form
    // 注：如果邮箱不为空且格式正确，affirmEmailError返回undefined表示正确
    const emailError = getFieldError('email')
    const affirmEmailError = getFieldError('affirmEmail')
    const emailFlag = !affirmEmailError && this.state.sameEmail
    const passwordError = getFieldError('password')
    const affirmPasswordError = getFieldError('affirmPassword')
    const passwordFlag = !affirmPasswordError && this.state.samePassword

    return (
      <form className={style.form}>
        <div className={style.box}>电子邮件用于接收您的账户信息，便于您日后查询</div>
        <IconContainer show={this.state.emailCheck} type={emailError ? 'warn' : 'success'}>
          {
            this.emailDecorator(<input
              type="email"
              placeholder="电子邮箱"
              className={`${style.input} ${emailError === undefined ? '' : style.border}`}
              onChange={(e) => this.handleSameValue(e, 'affirmEmail', 'sameEmail')} />)
          }
        </IconContainer>
        <IconContainer show={this.state.affirmEmailCheck} type={emailFlag ? 'success' : 'warn'}>
          {
            this.affirmEmailDecorator(<input
              type="email"
              placeholder="确认电子邮箱"
              className={`${style.input} ${emailFlag == false && this.state.affirmEmailCheck == true ? style.border : ''}`}
              onChange={(e) => {
                this.handleSameValue(e, 'email', 'sameEmail')
                this.handleChangeState('affirmEmailCheck', true)
              }} />)
          }
        </IconContainer>
        <div className={`${style.box} ${style.password}`}>密码必须为8-16位大小写字母、数字及特殊字符的组合</div>
        <IconContainer show={this.state.passwordCheck} type={passwordError ? 'warn' : 'success'}>
          {
            this.passwordDecorator(<input
              type="password"
              placeholder="登录密码"
              className={`${style.input} ${passwordError === undefined ? '' : style.border}`}
              onChange={(e) => this.handleSameValue(e, 'affirmPassword', 'samePassword')} />)
          }
        </IconContainer>
        <div className={style.progress}></div>
        <IconContainer show={this.state.affirmPasswordCheck} type={passwordFlag ? 'success' : 'warn'}>
          {
            this.affirmPasswordDecorator(<input
              type="password"
              placeholder="确认登录密码"
              className={`${style.input} ${passwordFlag == false && this.state.affirmPasswordCheck == true ? style.border : ''}`}
              onChange={(e) => {
                this.handleSameValue(e, 'password', 'samePassword')
                this.handleChangeState('affirmPasswordCheck', true)
              }} />)
          }
        </IconContainer>
        <div className={style.box}>通过手机动态密码验证后，才能够成功注册</div>
        <PhoneCode
          form={this.props.form}
          codeBorder={this.state.codeBorder}
          onChangeCode={() => this.handleChangeState('codeBorder', false)}
          phoneCheck={this.state.phoneCheck} />
        {/* <button className={`${style.button} btn btn-info`}>Next Step</button> */}
        <ControllerButton step="second" onHandleNext={this.handleSubmit} onHandlePreview={() => this.props.prev()} />
      </form>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  authCode: makeSelectAuthCode()
})

const mapDispatchToProps = (dispatch) => ({
  onValidateCode: (obj) => dispatch(doValidateCode(obj)),
  dispatch
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'secondStep', reducer })

// const withSaga = injectSaga({ key: 'secondStep', saga })

const wrappedPersonalInfo = createForm()(PersonalInfo)

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(wrappedPersonalInfo)
