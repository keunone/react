/*
 *
 * FirstStep reducer
 *
 */

import { fromJS } from 'immutable'
import { SAVE_DATA } from './constants'

const initialState = fromJS({
  firstStepData: {
    sex: '先生'
  }
})

function firstStepReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_DATA:
      return state.set('firstStepData', action.dataObj)
    default:
      return state
  }
}

export default firstStepReducer
