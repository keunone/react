/* global window */
import React from 'react'
import NProgress from 'nprogress'
import { connect } from 'dva'
import { Layout } from 'components'
import config from 'config'
import { withRouter, routerRedux } from 'dva/router'
import 'themes/index.scss'
import { menuTool } from 'utils'
import { doLogout } from './action'
import Error from '../error'

const { openPages } = config
let lastHref: string

const App = ({ children, location, history, dispatch, app, loading }: any) => {
  console.log(2)

  const { menu, user, locationData} = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`

  // 未登录调到login
  // console.log(pathname)
  console.log('user', user)
  if (!user && pathname !== '/login') {
    history.push('/login')
  }

  // NProgress
  const href = window.location.href
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  // 判断是否需要layout
  if (openPages && openPages.includes(pathname)) {
    return (
      <div>
        {children}
      </div>
    )
  } else {
    // 判断用户权限
    let hasPermission = true
    const menuItems = menuTool.getMenuItemsByMenuId(menu, locationData.menuId)
    if (menuItems && menuItems.length > 0) {
      let needPermissions = menuItems.reduce(
        (prev, next) => {
          let list = prev
          if (next.permission) {
            list = prev.concat(next.permission)
          }
          return list
        }, []
      )
      needPermissions = Array.from(new Set(needPermissions))
      console.log('needPermissions', needPermissions)
      // todo user的权限预期是一个数组以后需要修改
      if (needPermissions.length > 0 && needPermissions.indexOf(user.groupId) < 0) {
        hasPermission = false
      }
      console.log('hasPermission', hasPermission)
    }

    const childProps = {
      ...app,
      locationData,
      logout() {
        dispatch(doLogout())
      }
    }

    return (<Layout {...childProps}>{hasPermission ? children : <Error />}</Layout>)
  }

}

export default withRouter(connect(({ app, loading }: any) => ({ app, loading }))(App))
