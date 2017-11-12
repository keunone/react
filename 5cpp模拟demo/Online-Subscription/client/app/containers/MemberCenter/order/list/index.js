import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
// import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
// import saga from './saga'
import reducer from './reducer'
import { doFetchRequest } from './action'
import { makeSelectLoading, makeSelectSubscription, makeSelectToken } from './selectors'
import style from './index.scss'

class List extends Component {
  componentDidMount() {
    this.props.onFetchRequest(this.props.token)
  }

  render() {
    return (
      <div className={style.table}>
        <p>我的订单</p>
        <table>
          <tbody>
            <tr>
              <th>订单编号</th>
              <th>产品名称</th>
              <th>购买日期</th>
              <th>生效日期</th>
              <th>到期日期</th>
              <th>订单状态</th>
              <th>操作</th>
            </tr>
            {this.props.subscription.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.orderNo}</td>
                  <td>{item.name}</td>
                  <td>{item.creationTime}</td>
                  <td>{item.effectiveDate}</td>
                  <td>{item.terminationDate}</td>
                  <td><i className={style.status} style={{ background: item.status === 0 ? 'red' : 'green' }}>{''}</i>{item.status === 0 ? '审核中' : '审核通过'}</td>
                  <td><Link to={`/memberCenter/order/detail/${item.id}`} className={style.search}>查看</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  isLoading: makeSelectLoading(),
  subscription: makeSelectSubscription(),
  token: makeSelectToken()
})

const mapDispatchToProps = (dispatch) => ({
  onFetchRequest: (token) => dispatch(doFetchRequest(token))
})

const withReducer = injectReducer({ key: 'memberCenter', reducer })

// const withSaga = injectSaga({ key: 'memberCenter', saga })

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(List)
