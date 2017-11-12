import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  SET_MSG,
  CLEAR_MSG,
} from './constants'

export function doFetchData() {
  return {
    type: FETCH_DATA,
  }
}
export function doFetchSuccess() {
  return {
    type: FETCH_DATA_SUCCESS,
  }
}
export function doFetchError(msg) {
  return {
    type: FETCH_DATA_ERROR,
    msg
  }
}
export function doSetMessage(msg, msgType) {
  return {
    type: SET_MSG,
    msg,
    msgType
  }
}
export function doClearMessage() {
  return {
    type: CLEAR_MSG
  }
}
