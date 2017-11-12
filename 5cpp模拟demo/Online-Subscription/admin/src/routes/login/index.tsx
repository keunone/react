import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import config from 'config'
import styles from './index.scss'

const FormItem = Form.Item

interface Props { // interface: 类型检查
  form: {
    getFieldDecorator: any,
    validateFieldsAndScroll: any
  },
  dispatch: any,
  loading: {
    effects: any
  }
}

class Login extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
  }

  handleOk = () => {
    this.props.form.validateFieldsAndScroll((errors: object, values: any) => {
      if (errors) {
        return
      }
      this.props.dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src="/logo.png" />
          <span>{config.name}</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('loginName', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="large" onPressEnter={this.handleOk} placeholder="loginName" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="large" type="password" onPressEnter={this.handleOk} placeholder="Password" />)}
          </FormItem>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={this.handleOk}
              loading={this.props.loading.effects['login/login']}
            >
              Sign in
            </Button>
            <p>
              <span>LoginName：admin</span>
              <span>Password：admin</span>
            </p>
          </Row>
        </form>
      </div>
    )
  }
}

export default connect(({ loading }: any) => ({ loading }))(Form.create()(Login))
