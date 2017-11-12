

import { take, call, put } from 'redux-saga/effects'
import request from 'utils/request'
import { doNextStep } from '../StepContainer/actions'
import { VALIDATE_CODE } from './constants'
import { doSendForm } from './actions'
import { doSetMessage } from '../App/actions'


function* validateCode(action) {
  const { phone, code, exp, token, email, password } = action
  const requestUrl = '/api/v1/auth/users/verifysmscode'
  const response = yield call(request, requestUrl, {
    method: 'POST',
    body: JSON.stringify({
      phone: phone,
      code: code,
      exp: exp,
      token: token
    })
  })
  if (response.result.msg === 'success') {
    yield put(doSendForm(email, password))
    yield put(doNextStep())
  } else {
    yield put(doSetMessage('验证码有误', 'error'))
  }
}

export default function* defaultSaga() {
  while (true) {
    const action = yield take(VALIDATE_CODE)
    yield validateCode(action)
  }
}
