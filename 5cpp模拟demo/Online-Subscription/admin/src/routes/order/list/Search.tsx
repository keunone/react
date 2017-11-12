import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Button, Input } from 'antd'
const FormItem = Form.Item;

interface Props {
  dispatch: any,
  form: any,
  loading: {
    effects: any
  }
}

class Search extends Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      orderNumber: '',
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();
    let dataObj = {
      key: this.state.orderNumber
    }
    this.props.dispatch({type: 'order/getOrderList', dataObj})

  }

  changeOrderNumber = (e) => {
    this.setState({ orderNumber: e.target.value });
  }
  resetData = () => {
    this.props.form.resetFields();
    const dataObj = {
      MaxResultCount: 5, // 最大条数
      SkipCount: 0, // 跳过条数
    }
    this.props.dispatch({type: 'order/getOrderList', dataObj})
    this.props.dispatch({type: 'order/setPage', currentPage: 1})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{display: 'inline-block'}}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          订单编号:
          <Input
            value={this.state.orderNumber}
            size="large"
            onChange={this.changeOrderNumber}

            placeholder="请输入订单号"
            style={{'width': '300px', 'marginLeft': '20px', 'marginRight': '20px'}}
          />
          <Button type="primary" htmlType="submit" size="large">
            搜索
          </Button>
          <Button type="primary" size="large" style={{marginLeft: '20px'}} onClick={this.resetData}>
            重置
          </Button>
        </Form>
      </div>
    )
  }
}

export default connect(({ loading }: any) => ({ loading }))(Form.create()(Search))
