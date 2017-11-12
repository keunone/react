import { take, call, put } from 'redux-saga/effects'
import request from '../../utils/request'
import { SEND_PHONE } from './constants'
import { doGetCode } from './actions'

export function* postPhone(action) {
  try {
    const { phone } = action
    const requestUrl = '/api/v1/auth/users/sendsmscode'

    const response = yield call(request, requestUrl, {
      method: 'POST',
      body: phone
    })

    if (response.success) {
      const { exp, token } = response.result
      yield put(doGetCode(phone, '888888', exp, token))
    } else {
      yield put(doGetCode('', '', '', ''))
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default function* defaultSaga() {
  while (true) {
    const action = yield take(SEND_PHONE)
    yield postPhone(action)
  }
}
