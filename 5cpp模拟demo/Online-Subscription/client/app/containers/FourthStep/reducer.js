/*
 *
 * FourthStep reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SUBMIT_SUCCESS,
  SAVE_CHECK_STATE,
} from './constants'

const initialState = fromJS({
  orderCode: '',
  CheckState: {},
})

function fourthStepReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SUCCESS:
      return state
        .set('orderCode', action.orderCode)
    case SAVE_CHECK_STATE:
      return state
        .set('CheckState', action.data.CheckState)
    default:
      return state
  }
}
export default fourthStepReducer
