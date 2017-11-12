/*
 *
 * SecondStep actions
 *
 */

import { SEND_FORM, VALIDATE_CODE } from './constants'

export function doValidateCode({ phone, code, exp, token, email, password }) {
  return {
    type: VALIDATE_CODE,
    phone,
    code,
    exp,
    token,
    email,
    password
  }
}

export function doSendForm(email, password) {
  return {
    type: SEND_FORM,
    email,
    password
  }
}
