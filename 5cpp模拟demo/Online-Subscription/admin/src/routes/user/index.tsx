import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'dva/router'
import List from './list'
import Other from './other'

const User = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} render={() => (<Redirect to={`${match.path}/list`} />)} />
      <Route path={`${match.path}/list`} component={List} />
      <Route path={`${match.path}/other`} component={Other} />
    </Switch>
  )
}

export default withRouter(User)
