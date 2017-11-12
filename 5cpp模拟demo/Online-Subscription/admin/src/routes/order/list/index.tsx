import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Icon, Pagination, Button } from 'antd'
import SearchInput from './Search'
const { Column } = Table

interface Props {
  dispatch: any,
  oderListData: {
    totalCount: number,
    items: object
  },
  order: any,
}

interface GetDataType {
  dataObj: {
    MaxResultCount: number,
    SkipCount: number
  }
}

class List extends Component <Props, any> {
  constructor( props: Props ) {
    super(props)
    this.state = {
      SkipCount: 0, // 跳过条数
      currentPage: 1,
      pagination: {
        onChange: this.changePage,
        onShowSizeChange: this.changePageSize,
        current: this.props.order.currentPage,
        total: this.props.order.orderListData.totalCount, // 数据总数
        pageSizeOptions: ['2', '3', '5', '10', '20'],
        pageSize: 5, // 每页显示多少条
        showSizeChanger: true,
        showQuickJumper: true,
      }
    }
  }
  componentWillMount() {
    const dataObj = {
      MaxResultCount: this.state.pagination.pageSize, // 最大条数
      SkipCount: this.state.SkipCount, // 跳过条数
    }
    this.props.dispatch({type: 'order/getOrderList', dataObj})
  }
  componentWillReceiveProps(nextProps: any, nextState: any) {
    let orderListTotal = this.props.order.orderListData.totalCount
    let currentPage = this.props.order.currentPage
    let orderList = this.props.order.orderListData.items
    this.setState({
      pagination: {
        ...this.state.pagination,
        total: orderListTotal,
        current: currentPage
      }
    });

    console.log('componentWillReceiveProps ', this.state.pagination.pageSize)

  }

  changePage = (currentPage) => {
    this.setState({
      currentPage: currentPage,
      pagination: {
        ...this.state.pagination,
        currentPage: currentPage
      }
    }, () => {
      const dataObj = {
        MaxResultCount: this.state.pagination.pageSize,
        SkipCount: (currentPage - 1) * this.state.pagination.pageSize
      }
      this.props.dispatch({type: 'order/getOrderList', dataObj})
      this.props.dispatch({type: 'order/setPage', currentPage})
    })
  }
  changePageSize = (page, pageSize) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageSize
      }
    }, () => {
      const dataObj = {
        MaxResultCount: pageSize,
        SkipCount: (page - 1) * pageSize
      }
      this.props.dispatch({type: 'order/getOrderList', dataObj})
    })
    console.log(page, pageSize)
  }
  render() {
    console.log('render current', this.props.order.currentPage)
    const { totalCount, items } = this.props.order.orderListData
    if (items && items.length > 0) {
      items.map((item) => {
        item.creationTime = item.creationTime.substring(0, 10) + ' ' + item.creationTime.substring(11, 19);
      })
    }

    const columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    }, {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
    }, {
      title: '预订人姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    }, {
      title: '产品名称',
      dataIndex: 'productId',
      key: 'productId',
      width: 150,
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    }, {
      title: '创建日期',
      dataIndex: 'creationTime',
      key: 'creationTime',
      width: 200,
    }, {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      width: 100,
      render: (text, record) => (
        <span>
          <a href="#">查看</a>
        </span>
      )
    }];

    return (
      <div>
        <SearchInput placeholder="input search text" style={{ width: 200 }} />
        <p style={{margin: '10px auto'}}>共搜索到{totalCount}条数据</p>
        <Table columns={columns} dataSource={items} pagination={this.state.pagination} rowKey="id" scroll={{ y: 340 }}/>
      </div>
    )
  }
}

export default connect(({ order }: any) => ({ order }))(List)
