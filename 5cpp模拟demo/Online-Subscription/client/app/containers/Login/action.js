import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_OUT, CLEAR_USER } from './constant'

export const doLogin = (email, password) => {
  return {
    type: LOGIN_START,
    email,
    password
  }
}

export const doLoginOut = (token) => ({
  type: LOGIN_OUT,
  token
})

export const doClearUser = () => ({
  type: CLEAR_USER
})

export const doLoginSuccess = (email, password, res) => ({
  type: LOGIN_SUCCESS,
  email,
  password,
  res
})

export const doLoginError = (error) => ({
  type: LOGIN_ERROR,
  error
})
