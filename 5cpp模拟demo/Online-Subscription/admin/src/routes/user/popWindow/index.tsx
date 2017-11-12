
import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, Select, Modal } from 'antd'
import { doCreateUser } from './action'
import styles from './index.scss'

const FormItem = Form.Item
const Option = Select.Option
const FormCreate = Form.create()

function noop() {
  return false
}

interface Props { // interface: 类型检查
  form: any,
  dispatch: any,
  show: boolean,
  onChangeState: any,
  getUserList: any,
}

class PopWindow extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
  }

  // getValidateStatus = (field) => {
  //   const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
  //   if (isFieldValidating(field)) {
  //     return 'validating';
  //   } else if (!!getFieldError(field)) {
  //     return 'error';
  //   } else if (getFieldValue(field)) {
  //     return 'success';
  //   }
  // }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'admin') {
          callback([new Error('抱歉，该账号已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  handleCancel = (e) => {
    e.preventDefault()
    this.props.onChangeState('showCreateUser', false)
    this.props.form.resetFields()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let _self = this
    _self.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      // 此处调创建新用户的接口
      _self.props.dispatch(doCreateUser(values))
      // _self.handleCancel(e)
      _self.props.onChangeState('showCreateUser', false)
      _self.props.getUserList()
      console.log('Submit!!!');
      console.log(values);
    });
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form
    // 用户名
    const nameProps = getFieldProps('name', {
      initialValue: '',
      rules: [{
        required: true,
        message: '用户名不能为空'
      }]
    })

    // 账号
    const loginNameProps = getFieldProps('loginName', {
      initialValue: '',
      rules: [{
        required: true,
        min: 5,
        message: '账号至少为5个字符'
      },{
        validator: this.userExists
      }]
    })

    // 密码
    const passwordProps = getFieldProps('password', {
      initialValue: '',
      rules: [{
        required: true,
        min: 5,
        message: '密码至少为5个字符'
      }]
    })

    // 用户组
    const groupIdProps = getFieldProps('groupId', {
      rules: [{
        required: true,
        message: '请选择一个用户组'
      }]
    })

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 }
    }

    return (
      <Modal
        title="新建用户"
        visible={this.props.show}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >

        <div style={{display: true ? 'block' : 'none'}} className={styles.formWrapper}>
          {/* <p>新建用户</p> */}
          <Form horizontal form={this.props.form} className={styles.form}>
            <FormItem
              {...formItemLayout}
              label= '用户名：'
              hasFeedback>
              <Input {...nameProps} placeholder='请输入用户名' />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='账号：'
              hasFeedback
              help={isFieldValidating('loginName') ? '校验中...' : (getFieldError('loginName') || []).join(', ')}>
              <Input {...loginNameProps} placeholder='请输入5位字符以上的账号' />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='密码：'
              hasFeedback>
              <Input
                {...passwordProps}
                type='password'
                placeholder='请输入5位字符以上的密码'
                autoComplete="off"
                onContextMenu={noop}
                onPaste={noop}
                onCopy={noop}
                onCut={noop} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='用户组'>
              <Select {...groupIdProps} placeholder="请选择" style={{ width: '100%' }}>
                <Option value="1">普通管理员</Option>
                <Option value="2">超级管理员</Option>
              </Select>
            </FormItem>

            {/* <FormItem wrapperCol={{ span: 15, offset: 6}}>
              <Button type='ghost' onClick={this.handleCancel}>取消</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type='primary' onClick={this.handleSubmit}>确定</Button>
            </FormItem> */}
          </Form>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(({ loading }: any) => ({ loading }), mapDispatchToProps)(FormCreate(PopWindow))
