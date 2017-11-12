
import { fromJS } from 'immutable'
import { FETCH_SUCCESS } from './constants'

const initableState = fromJS({
  subscription: [],
  isLoading: false
})

const reducer = (state = initableState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return state
        .set('subscription', action.items)
        .set('isLoading', true)
    default:
      return state
  }
}

export default reducer
