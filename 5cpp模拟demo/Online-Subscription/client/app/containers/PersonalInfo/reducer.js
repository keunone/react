/*
 *
 * SecondStep reducer
 *
 */

import { fromJS } from 'immutable'
import { SEND_FORM } from './constants'

// 初始state
const initialState = fromJS({
  userInfo: {
    email: '',
    password: ''
  }
})

function secondStepReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_FORM:
      return state
        .setIn(['userInfo', 'email'], action.email)
        .setIn(['userInfo', 'password'], action.password)
    default:
      return state
  }
}

export default secondStepReducer
