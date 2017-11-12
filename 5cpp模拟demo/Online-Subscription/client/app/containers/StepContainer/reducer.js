/*
 *
 * StepContainer reducer
 *
 */

import { fromJS } from 'immutable'
import {
  NEXT_STEP,
  PREVIEW_STEP,
  RESET_STEP,
  StepList
} from './constants'

const initialState = fromJS({
  currentStep: 0
})

function stepContainerReducer(state = initialState, action) {
  const maxStep = StepList.length
  const currentStep = state.get('currentStep')
  switch (action.type) {
    case NEXT_STEP:
      console.log('action')
      return currentStep + 1 <= maxStep ?
        state.set('currentStep', currentStep + 1) : state
    case PREVIEW_STEP:
      return currentStep - 1 >= 0 ?
        state.set('currentStep', currentStep - 1) : state
    case RESET_STEP:
      return state.set('currentStep', 0)
    default:
      return state
  }
}

export default stepContainerReducer
