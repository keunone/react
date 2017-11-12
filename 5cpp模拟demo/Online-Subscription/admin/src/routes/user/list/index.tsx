import React, { Component } from 'react'
import { Modal, Form, Table, Icon, Pagination, Button, Input, Select, Cascader, Popconfirm, message} from 'antd';
import { connect } from 'dva';
import { actionGetUserList, doDelUser, actionSaveCurrent } from './action'
import NewModal from './Modal'
import { createForm } from 'rc-form'
import PopWindow from '../popWindow'

import SearchInput from './search'
import style from './index.scss'

interface Props {
  dispatch: any,
  handleClick: any,
  user: any,
}

interface State {
  visible: boolean,
  SkipCount: number,
  pagination: any,
  showCreateUser: any,
  rowData: any,
  modalVisible: any
  user: any,
}

function filterName(groupId: any) {
  groupId = groupId + ''
  switch (groupId) {
    case '0':
      return '普通用户'
    case '1':
      return '普通管理员'
    case '2':
      return '超级管理员'
    default:
      return groupId
  }
}

class List extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.state = {
      visible: false,
      SkipCount: 0, // 跳过条数
      user: props.user,
      pagination: {
        current: props.user.current, // 当前页
        onChange: this.onChange,
        onShowSizeChange: this.onShowSizeChange,
        pageSizeOptions: ['2', '3', '5', '10', '20'],
        total: 10, // 数据总数
        pageSize: 2, // 每页显示多少条
        showSizeChanger: true, // 改变每页条数
        showQuickJumper: true, // 跳页
      },
      showCreateUser: false, // 显示新建用户弹窗
      rowData: {},
      modalVisible: false ,  // 显示model
    }

    this.props.dispatch( actionGetUserList() )

  }

  componentWillReceiveProps(nextProps: any, nextState: any) {
    let user = {items: [], total: undefined}
    user.items = this.props.user.items.map(item => {
      // let groupId = ['否', '普通', '超级'][item.groupId]
      var time = new Date (item.lastLoginDate)
      let lastLoginDate = `${
        time.getFullYear()}-${
        time.getMonth() + 1}-${
        time.getDate()} ${
        time.getHours()}:${
        time.getMinutes()}:${
        time.getSeconds()}`
      return {...item, lastLoginDate}
    })
    user.total = this.props.user.totalCount
    this.setState({
      user,
      pagination: {
        ...this.state.pagination,
        total: user.total,
        current: this.props.user.current
      }
    });
  }

  getUserList = (arg?: any) => {
      if (arg === 'searchEvent') { // 如果是搜索事件，
        this.props.dispatch( actionSaveCurrent(1) );
      } else {
        this.props.dispatch( actionGetUserList() );
      }
  }

  onChange = (page: any) => {
    console.log('切换到页', page);
    const SkipCount = (page - 1) * this.state.pagination.pageSize
    this.props.dispatch( actionSaveCurrent(page) );
    this.setState({
      pagination: {
        ...this.state.pagination,
        // current: page
      }
    }, () => {
      this.props.dispatch(actionGetUserList({
        Name: this.props.user.Query.Name,
        MaxResultCount: this.state.pagination.pageSize, // 最大条数
        SkipCount, // 跳过条数
      }))
    })

  }

  // onChange( page: any ) {
  //   const SkipCount = (page - 1) * this.state.pagination.pageSize
  //   this.props.dispatch(actionGetUserList({
  //     Name: this.props.user.Query.Name,
  //     MaxResultCount: this.state.pagination.pageSize, // 最大条数
  //     SkipCount, // 跳过条数
  //   }))

  // }

  onShowSizeChange(current: any, pageSize: any) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageSize
      }
    }, () => {
      this.props.dispatch(actionGetUserList({
        Name: this.props.user.Query.Name,
        MaxResultCount: pageSize, // 最大条数
        SkipCount: (current - 1) * pageSize, // 跳过条数
      }))
    })
  }

  cancel = () => {
    message.error('点击了取消');
  }

  handleChangeState = (param: any, flag: any) => {
    this.setState({
      [param]: flag
    })
  }

  confirm = (id: number) => {
    this.props.handleClick(id)
    this.getUserList()
    message.success('点击了确定');
  }

  // 显示model
  showModal = (rowData) => {
    console.log('rowData', rowData)
    this.setState({
      modalVisible: true,
      visible: true,
      rowData: rowData
    });
    this.getUserList()
  }
  // 提交修改
  handleOk = (data) => {
    console.log('请求接口的数据', data)
    this.props.dispatch({type: 'user/editUserData', payload: data })
    this.setState({
      modalVisible: false,
    });
  }
  // 关闭model
  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const FormItem = Form.Item
    const Option = Select.Option
    const {handleCancel, handleOk, getUserList, state: {rowData: item, modalVisible: visible}} = this

    console.log('item', item)
    const modalProps = {
      item: item,
      visible: visible,
      maskClosable: false,
      getUserList,
      title: '编辑用户',
      wrapClassName: 'vertical-center-modal',
      onOk (data: any) {
        handleOk(data)
      },
      onCancel () {
        handleCancel()
      },
    }
    const columns = [
      {
        title: '用户ID', // 列头显示文字
        dataIndex: 'id', // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
      },
      {
        title: '用户姓名',
        dataIndex: 'name',
      },
      {
        title: '超级管理员',
        dataIndex: 'groupId',
        render( text: string ) {
          return <span>{filterName(text)}</span>
        }
      },
      {
        title: '上次登录',
        dataIndex: 'lastLoginDate',
      },
      {
        title: '操作',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => this.showModal(record)}>编辑</a> {/* 使用 record.ID 获得 ID */}
            <span className="ant-divider" />
            <Popconfirm
              title="确定要删除这个用户吗？"
              onConfirm={() => this.confirm(record.id)}
              onCancel={this.cancel}
            >
              <a href="javascript:">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ]
    const rowKey = function( record: any ) {
      return record.id;  // 修改 key 键为 id
    }

    return (
      <div>
        <div className={style.top_search}>
          <SearchInput getUserList={this.getUserList}  placeholder="input search text" style={{ width: 200 }} />
        </div>

        <div className={style.result}>
          {`共搜索到 ${this.state.pagination.total} 条数据`}
        </div>

        <Button
          type="primary"
          size="large"
          className={`btn btn-info ${style.addUser}`}
          onClick={() => this.handleChangeState('showCreateUser', true)}
        >
          新建用户
        </Button>

        {<PopWindow

          show={this.state.showCreateUser}
          getUserList={getUserList}
          onChangeState={this.handleChangeState}

        />}
        <Table
          rowKey={(record: any) => record.id}
          pagination={this.state.pagination}
          columns={columns}
          dataSource={this.state.user.items}
        />

        <NewModal {...modalProps}  />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  ...state,
})

const mapDispatchToProps = (dispatch: any) => ({
  handleClick: (id) => {dispatch(doDelUser(id))},
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
