import { actionSave, actionModelGetUserList, actionSaveQuery } from './action'
import { getUserList, editUserInfo, createUser, delectUser } from 'services/user'

export default {
  namespace: 'user',
  state: {
    items: [],
    totalCount: 0,
    Query: {},
    current: 1, // 默认当前所在页
  },
  reducers: {
    save(state: any, { payload }: any) {
      return {...state, ...payload}
    },
    saveQuery(state: any, {payload}: any) {
      return {...state, ...payload}
    },
    saveCurrent(state: any, {payload}: any) {
      return {...state, ...{current: payload}}
    },
    edit(state: any, { payload }: any) {
      return {...state, ...payload}
    }
  },
  effects: {
    * getUserList({payload}: any, { put, call, select }: any) {
      let _old = yield select(state => state.user.Query)
      let _payload = payload ? payload : _old // 如果不传值，使用sotre中的值
      if ( JSON.stringify(payload) === '{}') {
        _payload = {}
      }
      console.log('20171102174411', Boolean(payload), _payload )
      const data = yield call(getUserList, _payload) // 请求数据
      const { items, totalCount } = data.result
      yield put( actionSave( {items, totalCount} ) ) // 保存请求到的数据
      yield put( actionSaveQuery({Query: _payload}) ) // 保存查询条件
    },
    * editUserData({ payload }: any, { put, call }: any) {
      const data = yield call(editUserInfo, payload)
      yield put({type: 'edit', data })
      yield put( actionModelGetUserList( {} ) )
    },

    * createUser({ payload }: any, { put, call, select }: any) {
      const token = yield select(state => state.app.user.token)
      payload.groupId = parseInt(payload.groupId, 10)
      console.log('payload', payload)
      const response = yield call(createUser, payload, token)
      yield put( actionModelGetUserList( {} ) )
    },

    * delUser({ payload }: any, { put, call, select }: any) {
      console.log('delUser', payload)
      const response = yield call(delectUser, payload.id)
      yield put( actionModelGetUserList( {} ) )
    },
  }
}
