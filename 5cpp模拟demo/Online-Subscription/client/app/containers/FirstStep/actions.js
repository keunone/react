import { SAVE_DATA } from './constants'

export function doSaveData(dataObj) {
  return {
    type: SAVE_DATA,
    dataObj
  }
}
