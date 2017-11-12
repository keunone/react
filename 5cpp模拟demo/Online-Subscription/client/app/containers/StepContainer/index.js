/**
 *
 * StepContainer
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import injectReducer from 'utils/injectReducer'
import makeSelectStepContainer from './selectors'
import reducer from './reducer'
import { doNextStep, doPreviewStep, doResetStep } from './actions'

import Steps from '../../components/Steps'
import { StepList } from './constants'

class StepContainer extends React.Component {
  constructor(props) {
    super(props)
    // 判断currentStep是否是当前页面路径
    const { stepcontainer, match, history, location } = props
    const currentStepName = location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
    const storeStepName = StepList[stepcontainer.currentStep].route
    if (currentStepName !== storeStepName) {
      history.push(`${match.path}/${StepList[stepcontainer.currentStep].route}`)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.stepcontainer)
    const newStep = nextProps.stepcontainer.currentStep === 5 ?
      0 : nextProps.stepcontainer.currentStep
    // 判断step更新，更新Step状态，跳转页面
    if (newStep !== this.props.stepcontainer.currentStep) {
      StepList.forEach((item, index) => {
        if (index < newStep) {
          item.state = 'done'
        } else if (index === newStep) {
          item.state = 'active'
        } else {
          item.state = 'do'
        }
      })
      if (nextProps.stepcontainer.currentStep === 5) {
        this.props.dispatch(doResetStep())
        this.props.history.push('/')
      } else {
        this.props.history.push(StepList[newStep].route)
      }
    }
  }
  render() {
    const { match, next, prev } = this.props
    return (
      <div className="container-fluid">
        <Helmet>
          <title>StepContainer</title>
          <meta name="description" content="Description of StepContainer" />
        </Helmet>
        <div className="row">
          <Steps stepObj={StepList} />
        </div>
        <div className="row">
          {/* <FirstStep /> */}
          <Switch>
            {
              StepList.map(item => (
                <Route
                  key={item.route}
                  path={`${match.path}/${item.route}`}
                  component={() => {
                    const Component = Loadable({ loader: item.component, loading: () => null })
                    return <Component {...{ next, prev }} />
                  }}
                />
              ))
            }
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  stepcontainer: makeSelectStepContainer(),
})

function mapDispatchToProps(dispatch) {
  return {
    next: () => dispatch(doNextStep()),
    prev: () => dispatch(doPreviewStep()),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'stepContainer', reducer })

export default compose(
  withReducer,
  withConnect,
)(StepContainer)
