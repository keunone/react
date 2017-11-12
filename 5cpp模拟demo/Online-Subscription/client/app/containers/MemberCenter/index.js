/**
 *
 * MemberCenter
 *
 */

import React from 'react'
import { compose } from 'redux'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Detail from './order/detail'
import List from './order/list'
import { doLoginOut } from '../Login/action.js'
import style from './index.scss'
import injectReducer from 'utils/injectReducer'
// import injectSaga from 'utils/injectSaga'
// import saga from '../Login/saga.js'
import reducer from '../Login/reducer.js'

class MemberCenter extends React.Component {
  render() {
    // const { match } = this.props
    return (
      <div>
        <div className={style.sider}>
          <ul>
            <li>LOGO</li>
            <li onClick={this.props.onLoginOut} className={style.logout}>退出</li>
          </ul>
        </div>

        <div className={style.content}>
          <div className={style.header}>
            <span className={style.member}>会员中心</span>
            <span>中文 | English</span>
            <span>欢迎您，{this.props.name}</span>
          </div>
          <div className={style.bottom}>
            <Switch>
              <Route path={'/MemberCenter/order/list'} component={List} />
              <Route path={'/MemberCenter/order/detail/:id'} component={Detail} />
              <Route path="/MemberCenter" component={List} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.getIn(['login', 'userInfo', 'name'])
})

const mapDispatchToProps = (dispatch) => ({
  onLoginOut: () => dispatch(doLoginOut())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'login', reducer })
// const withSaga = injectSaga({ key: 'login', saga })

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(MemberCenter)

