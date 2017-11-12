import { take, call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import reducer from './reducer'
import { LOGIN_START, LOGIN_OUT } from './constant'
import { doSetMessage } from '../App/actions'
import { doLoginSuccess, doLoginError, doClearUser } from './action'
import request from '../../utils/request'

let result = {}
export function* postLogin(action) {
  const { email, password } = action
  const requestURL = '/api/v1/auth/users/login'
  try {
    const res = yield call(request, requestURL, { method: 'POST', body: JSON.stringify({ email, password })})
    result = res.result
    if (res.error) {
      yield put(doSetMessage(res.error.message, 'error'))
    } else {
      yield put(doLoginSuccess(email, password, res.result))
      yield put(push('/MemberCenter'))
      yield put(push('/MemberCenter'))
    }
  } catch (error) {
    console.log(error)
    // debugger
    // if (error.status === 500) {
    //   yield put(doSetMessage('aaa', 'error'))
    // }
    // yield put(doLoginError(500))
  }
}

export function* loginOut() {
  const reqUrl = '/api/v1/auth/users/logout'
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${result.token}`
    }
  }
  try {
    yield call(request, reqUrl, options)
    yield put(doClearUser())
    yield put(push('/'))
    yield put(push('/'))
  } catch (error) {
    yield put(doLoginError(error))
  }
}

export function* loginFlow() {
  while (true) {
    const action = yield take(LOGIN_START)
    yield postLogin(action)
  }
}

export function* loginOutFlow() {
  while (true) {
    yield take(LOGIN_OUT)
    yield loginOut()
  }
}
