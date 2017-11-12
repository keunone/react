/*
 * rootSaga
 */
import { fork } from 'redux-saga/effects'
import { loginFlow, loginOutFlow } from '../Login/saga'
import phonceCodeFlow from '../PhoneCode/saga'
import verifyMsgFlow from '../PersonalInfo/saga'
import subscriptionFlow from '../FourthStep/saga'
import memberListFlow from '../MemberCenter/order/list/saga'
import memberDetailFlow from '../MemberCenter/order/detail/saga'

export default function* defaultSaga() {
  yield fork(loginFlow)
  yield fork(loginOutFlow)
  yield fork(phonceCodeFlow)
  yield fork(verifyMsgFlow)
  yield fork(subscriptionFlow)
  yield fork(memberListFlow)
  yield fork(memberDetailFlow)
}
