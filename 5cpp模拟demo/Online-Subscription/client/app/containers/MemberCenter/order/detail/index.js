import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
// import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
// import saga from './saga'
import reducer from './reducer'
import { doCheckById } from './action'
import style from './index.scss'

class Detail extends Component {
  componentWillMount() {
    this.props.onCheckById(this.props.match.params.id)
  }

  render() {
    return (
      <div className={style.table}>
        <p>订单详情</p>
        <ul>
          <li>
            <span>订单编号：</span>
            <span>{this.props.subscriptionDetail.get('orderNo')}</span>
          </li>
          <li>
            <span>预订人姓名：</span>
            <span>{this.props.name}</span>
          </li>
          <li>
            <span>产品名称：</span>
            <span>{this.props.subscriptionDetail.get('name')}</span>
          </li>
          <li>
            <span>订单状态：</span>
            <span>{this.props.subscriptionDetail.get('status') === '0' ? '审核中' : '审核通过'}</span>
          </li>
          <li>
            <span>保障起止时间：</span>
            <span>{this.props.subscriptionDetail.get('terminationDate')} 至 {this.props.subscriptionDetail.get('effectiveDate')}</span>
          </li>
          <li>
            <span>订单创建时间：</span>
            <span>{this.props.subscriptionDetail.get('creationTime')}</span>
          </li>
        </ul>
        <button className={`${style.btn} btn btn-info`}><Link to="/MemberCenter">返回</Link></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  subscriptionDetail: state.get('subscriptionDetail'),
  name: state.getIn(['login', 'userInfo', 'name'])
})

const mapDispatchToProps = (dispatch) => ({
  onCheckById: (id) => dispatch(doCheckById(id))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

// const withSaga = injectSaga({ key: 'subscriptionDetail', saga })

const withReducer = injectReducer({ key: 'subscriptionDetail', reducer })

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(Detail)
