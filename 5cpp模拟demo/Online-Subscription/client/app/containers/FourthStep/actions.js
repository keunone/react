/*
 *
 * FourthStep actions
 *
 */

import {
  SUBMIT_DATA,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR,
  SAVE_CHECK_STATE,
} from './constants'

export function doSubmitData(dataObj) {
  return {
    type: SUBMIT_DATA,
    dataObj
  }
}

export function doSubmitSuccess(orderCode) {
  return {
    type: SUBMIT_SUCCESS,
    orderCode
  }
}

export function doSubmitError(error) {
  return {
    type: SUBMIT_ERROR,
    error
  }
}

export function doSaveData(data) {
  return {
    type: SAVE_CHECK_STATE,
    data
  }
}
