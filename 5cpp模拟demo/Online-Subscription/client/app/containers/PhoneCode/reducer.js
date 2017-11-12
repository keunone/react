
import { fromJS } from 'immutable'
import { GET_CODE } from './constants'

const initState = fromJS({
  phone: '',
  code: '',
  exp: '',
  token: ''
})

const codeReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CODE:
      return state
        .set('phone', action.phone)
        .set('code', action.code)
        .set('exp', action.exp)
        .set('token', action.token)
    default:
      return state
  }
}

export default codeReducer
