import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Button, Select } from 'antd'

const Option = Select.Option

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const userGroup = [{
  value: '1',
  label: '普通管理员',
}, {
  value: '2',
  label: '超级管理员',
}]

interface UserModal {
  form: {
    getFieldDecorator: any,
    validateFieldsAndScroll: any,
    validateFields: any,
  },
  item: object,
  onOk: any,
  visible: boolean,
  onCancel: any,
}
interface State {
  showInputIcon: boolean,
  showSelectIcon: boolean
}

class NewModal extends Component <UserModal, State> {
  constructor( props: UserModal) {
    super(props)
    this.state = {
      showInputIcon: false,
      showSelectIcon: false
    }
  }

  // componentWillReceiveProps(nextProps: any, nextState: any) {
  //   console.log('进入componentWillReceiveProps')

  //   this.setState({
  //     showInputIcon: !this.props.visible,
  //     showSelectIcon: !this.props.visible
  //   })
  // }
  render() {
    const { onOk, onCancel, item, form, visible, title, getUserList}: any = this.props
    const { getFieldDecorator, validateFields, getFieldsValue }: any = form
    const handleOk = () => {
      console.log('进入handeOk')
      this.setState({
        showInputIcon: true,
        showSelectIcon: true
      })
      validateFields((errors) => {
        if (errors) {
          return
        }

        const data = {
          ...getFieldsValue(),
        }
        const postData = {
          name: data.name,
          groupId: parseInt(data.userGroup, 10),
          id: item.id
        }
        onOk(postData)
        // setTimeout(() => getUserList(), 1000)
      })
    }
    console.log('item555555555', item)
    return (
      <div>
        <Modal
          visible={visible}
          title={title}
          onCancel={onCancel}
          footer={[
                <Button key="back" size="large" onClick={onCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large" onClick={handleOk}>
                  保存
                </Button>,
              ]}
        >
          <Form layout="horizontal">
            <FormItem label="用户姓名" hasFeedback={this.state.showInputIcon} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                  }
                ],
              })(<Input />)}
            </FormItem>

            <FormItem label="用户组" hasFeedback={this.state.showSelectIcon} {...formItemLayout}>
              {getFieldDecorator('userGroup', {
                initialValue: userGroup[item.groupId - 1 || 0].value,
                rules: [
                  {
                    required: true,
                    message: '用户姓名不能为空'
                  },
                ],
              })(<Select style={{ width: 280 }} placeholder="选择用户组">
                  {userGroup.map( userItem => {
                    return <Option key={userItem.value} value={userItem.value}>{userItem.label}</Option>
                  })}
                </Select>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }

}

export default Form.create()(NewModal)
