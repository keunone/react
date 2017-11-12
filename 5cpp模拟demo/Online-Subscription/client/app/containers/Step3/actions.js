

import {
  DEFAULT_ACTION,
  SAVE_DATA,
} from './constants'

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  }
}

export function doSaveData(dataObj) {
  return {
    type: SAVE_DATA,
    dataObj
  }
}
