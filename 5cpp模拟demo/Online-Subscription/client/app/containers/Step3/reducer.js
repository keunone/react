/*
 *
 * SecondStep reducer
 *
 */

import { fromJS } from 'immutable'

import {
  SAVE_DATA,
} from './constants'

const initialState = fromJS({})

function step3Reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_DATA:
      return state
        .set('PaymentType', action.dataObj.PaymentType)
    default:
      return state
  }
}

export default step3Reducer
