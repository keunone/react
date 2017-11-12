import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'dva/router'
import List from './list'

const Order = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} render={() => (<Redirect to={`${match.path}/list`} />)} />
      <Route path={`${match.path}/list`} component={List} />
    </Switch>
  )
}

export default withRouter(Order)
