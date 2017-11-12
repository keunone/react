import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Button, Input, Icon } from 'antd'
import { actionGetUserList } from '../action'
const FormItem = Form.Item;

interface Props {
  dispatch: any,
  form: any,
  userNameInput: '',
  getUserList: any,
  loading: {
    effects: any
  }
}

class Search extends Component<Props, any> {
  userNameInput: any

  constructor(props: Props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      userName: '',
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log('收到表单值：', this.state.userName);
    let userName = this.state.userName
    this.props.getUserList('searchEvent')
    this.props.dispatch(actionGetUserList({
      Name: userName,
    }))

  }

  onChangeUserName = (e) => {
    console.log('onChangeUserName')
    this.setState({ userName: e.target.value });
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
    // this.props.dispatch(actionGetUserList({}))
  }

  render() {
    const userName = this.state.userName
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          用户姓名:
          <Input
            size="large"
            suffix={suffix}
            value={userName}
            placeholder="请输入"
            onChange={this.onChangeUserName}
            ref={node => this.userNameInput = node}
            style={{'width': '300px', 'marginLeft': '20px', 'marginRight': '20px'}}
          />
          <Button type="primary" htmlType="submit" size="large">
            搜索
          </Button>
        </Form>
      </div>
    )
  }
}

export default connect(({ loading }: any) => ({ loading }))(Search)
