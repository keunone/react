/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Form from 'containers/Form/Loadable'
import HomePage from 'containers/HomePage/Loadable'
import StepContainer from 'containers/stepContainer'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Header from 'components/Header'
import injectSaga from 'utils/injectSaga'
import ReactLoading from 'react-loading'
import classnames from 'classnames'
import { connect } from 'react-redux'
import injectReducer from 'utils/injectReducer'
import { compose } from 'redux'
import MemberCenter from 'containers/MemberCenter'
import TransitionGroup from 'react-addons-css-transition-group'
import saga from './saga'
import Alert from '../../components/Alert'
import reducer from './reducer'

function App({ loading, msgList, dispatch }) {
  return (
    <div>
      { loading && <div className="loading-modal"><ReactLoading className={classnames('custom-loading')} type="spinningBubbles" /></div> }
      <TransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={200}>
        {msgList.map((item) => {
        return <Alert key={item.id} dispatch={dispatch} type={item.msgType} message={item.msg} />
      })}
      </TransitionGroup>
      <Switch>
        <Route path="/memberCenter" component={MemberCenter} />
        <Route path="/">
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/form" component={Form} />
              <Route path="/step" component={StepContainer} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.getIn(['global', 'loading']),
    msgList: state.getIn(['global', 'msgList']),
    // msgType: state.getIn(['global', 'msgType']),
    ...state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'global', reducer })

const withSaga = injectSaga({ key: 'appRootSaga', saga })

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(App)
