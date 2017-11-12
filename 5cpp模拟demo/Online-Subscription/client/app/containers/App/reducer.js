import { fromJS } from 'immutable'

import {
  FETCH_DATA,
  FETCH_DATA_ERROR,
  FETCH_DATA_SUCCESS,
  SET_MSG,
  CLEAR_MSG
} from './constants'


const initialState = fromJS({
  loading: false,
  msgList: [],
  // msgType: '',
})

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return state
        .set('loading', true)
    case FETCH_DATA_ERROR:
      return state
        // .set('msg', action.msg)
        // .set('msgType', 'error')
        .set('loading', false)
        .set('msgList', [{
          id: 0,
          msg: action.msg,
          msgType: 'error'
        }])
    case FETCH_DATA_SUCCESS:
      return state
        .set('loading', false)
    case SET_MSG:
      // const currentList = state.get('')
      return state
        .set('msgList', [{
          id: 0,
          msg: action.msg,
          msgType: action.msgType
        }])
        // .set('msg', action.msg)
        // .set('msgType', action.msgType)
    case CLEAR_MSG:
      return state
        .set('msgList', [])
    default:
      return state
  }
}

export default appReducer
