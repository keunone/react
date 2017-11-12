import React from 'react'
import { routerRedux, Route, Switch, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes/app'

const { ConnectedRouter } = routerRedux

const Routers = ({ history, app }: any) => {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      // models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/index'),
    }, {
      path: '/user',
      models: () => [import('./routes/user/list/model')],
      component: () => import('./routes/user/index'),
    }, {
      path: '/order',
      models: () => [import('./routes/order/model')],
      component: () => import('./routes/order/index'),
    }, {
      path: '/login',
      models: () => [import('./routes/login/model')],
      component: () => import('./routes/login/index'),
    }
  ]
  console.log('Routers', app)

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
          {routes.map(({ path, ...dynamics }) => (
              <Route
                key={path}
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))}
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

export default Routers
