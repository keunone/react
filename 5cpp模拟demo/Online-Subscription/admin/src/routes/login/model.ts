import { login } from 'services/user'
import { routerRedux } from 'dva/router'
import { cookie } from 'utils'

interface Payload {
  payload: {
    loginName: string,
    password: string
  }
}

export default {
  namespace: 'login',
  state: {},
  effects: {
    * login({ payload }: Payload, { put, call }: any) {
      const response = yield call(login, payload)
      const { id, name, loginName, groupId, expires } = response.result
      let { token } = response.result
      const data = { id, name, loginName, groupId, token }
      cookie.set('user', data, expires)
      yield put({ type: 'app/updateUser', payload: data })
      yield put(routerRedux.push('/dashboard'))
    }
  }
}
