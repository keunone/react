import request from 'utils/request'
import { take, put, call } from 'redux-saga/effects'
import { FETCH_REQUEST } from './constants'
import { doGetSubscription } from './action'

function serializeDate(time) {
  const date = new Date(time)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

function* getSubscription(action) {
  debugger;
  const requestUrl = '/api/v1/core/subscriptions/my'
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${action.token}`
    }
  }
  try {
    const response = yield call(request, requestUrl, requestOptions)
    const items = response.result.items.map((item) => {
      item.creationTime = serializeDate(item.creationTime)
      item.effectiveDate = serializeDate(item.effectiveDate)
      item.terminationDate = serializeDate(item.terminationDate)
    })
    console.log('items', items)
    yield put(doGetSubscription(response.result.items))
  } catch (error) {
    throw new Error('get Subscription fail')
  }
}

export default function* defaultSaga() {
  while (true) {
    const action = yield take(FETCH_REQUEST)
    yield call(getSubscription, action)
  }
}
