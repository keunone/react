import { routerRedux } from 'dva/router'
import { logout } from 'services/user'
import * as queryString from 'query-string'
import menu from 'config/menu'
import { menuTool, cookie } from 'utils'
import { doUpdateState, doClearState } from './action'

interface LocationState {
  locationPathname: string,
  locationQuery: string,
  menuId: string
}

export default {
  namespace: 'app',
  state: {
    user: cookie.getJSON('user'),
    menu: menu,
    bread: [{name: 'Dashboard', route: '/dashboard'}],
    locationData: {}
  },
  subscriptions: {
    setupHistory({ dispatch, history }: any) {
      history.listen((location: any) => {
        console.log(1)
        const menuItem = menuTool.getMenuItemByRoute(menu, location.pathname) || {}
        const menuId = menuItem.id
        dispatch(
          doUpdateState(location, menuId)
        )
      })
    }
  },
  effects: {
    *logout({ payload }: any, { call, put }: any) {
      // 调用logout接口
      yield call(logout)
      cookie.remove('user')
      yield put(doClearState())
      yield put(routerRedux.push({
        pathname: '/login',
      }))
    }
  },
  reducers: {
    updateUser(state: any, { payload }: any) {
      return {
        ...state,
        user: payload,
      }
    },
    updateState(state: any, { payload }: any) {
      console.warn('payload', payload)
      return {
        ...state,
        locationData: payload
      }
    },
  }
}
