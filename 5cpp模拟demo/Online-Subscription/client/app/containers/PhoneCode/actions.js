
import { SEND_PHONE, GET_CODE } from './constants'

export function doSendPhone(phone) {
  return {
    type: SEND_PHONE,
    phone
  }
}

export function doGetCode(phone, code, exp, token) {
  return {
    type: GET_CODE,
    phone,
    code,
    exp,
    token
  }
}
