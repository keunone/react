
import request from 'utils/request'
import { take, put, call } from 'redux-saga/effects'
import { doGetDetail } from './action'
import { FETCH_REQUEST } from './constants'

function serializeDate(time) {
  const date = new Date(time)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

function* getDetail(action) {
  let date
  const requestUrl = `/api/v1/core/subscriptions/${action.id}`
  const response = yield call(request, requestUrl, {
    method: 'GET',
  })

  if (response.success) {
    date = response.result
    date.creationTime = serializeDate(date.creationTime)
    date.effectiveDate = serializeDate(date.effectiveDate)
    date.terminationDate = serializeDate(date.terminationDate)
  } else {
    date = null
  }
  yield put(doGetDetail(date))
}

export default function* defaultSaga() {
  while (true) {
    const action = yield take(FETCH_REQUEST)
    yield call(getDetail, action)
  }
}
