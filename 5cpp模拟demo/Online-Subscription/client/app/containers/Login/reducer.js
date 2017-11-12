import { fromJS } from 'immutable'
import {
  LOGIN_START,
  LOGIN_OUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAR_USER
} from './constant'

const initState = fromJS({
  userInfo: {
    email: '',
    password: '',
  },
  isLoading: false,
  error: '',
})

const applyLogin = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return state.set('isLoading', true)
    case CLEAR_USER:
      return state
        .setIn(['userInfo', 'email'], '')
        .setIn(['userInfo', 'password'], '')
        .set('isLoading', false)
    case LOGIN_SUCCESS:
      debugger;
      return state
        .setIn(['userInfo', 'email'], action.email)
        .setIn(['userInfo', 'password'], action.password)
        .setIn(['userInfo', 'name'], action.res.name)
        .setIn(['userInfo', 'token'], action.res.token)
        .setIn(['userInfo', 'expire'], action.res.expire)
        .setIn(['userInfo', 'id'], action.res.id)
        .set('isLoading', false)
    case LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false)
    case LOGIN_OUT:
      console.log('LOGIN_OUT', state, action) // REVIEW 这里如何获取 state 中的保存的对象属性

      return state
        .set('isLoading', false)
    default:
      return state
  }
}

export default applyLogin
