/*
 *
 * StepContainer actions
 *
 */
import {
  NEXT_STEP,
  PREVIEW_STEP,
  RESET_STEP,
} from './constants'

export const doNextStep = () => {
  return {
    type: NEXT_STEP
  }
}

export const doPreviewStep = () => {
  return {
    type: PREVIEW_STEP
  }
}

export const doResetStep = () => {
  return {
    type: RESET_STEP
  }
}
