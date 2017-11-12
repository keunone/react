import { take, call, put } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { SUBMIT_DATA } from './constants'
import { doSubmitSuccess, doSubmitError } from './actions'
import request from '../../utils/request'
import { doNextStep } from '../StepContainer/actions'


export function* postSubmitData(action) {
  const { dataObj } = action
  const requestURL = '/api/v1/core/subscriptions'
  try {
    const data = yield call(request, requestURL, { method: 'POST',
      body: JSON.stringify(dataObj)
    })
    console.log('postSubmitData success', data.result.orderNo)
    yield put(doSubmitSuccess(data.result.orderNo))
    yield put(doNextStep())
  } catch (error) {
    yield put(doSubmitError(error))
  }
}

export default function* defaultSaga() {
  while (true) {
    const action = yield take(SUBMIT_DATA)
    yield postSubmitData(action)
  }
}
