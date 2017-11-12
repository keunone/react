
import { FETCH_REQUEST, FETCH_SUCCESS } from './constants'

export const doFetchRequest = (token) => ({
  type: FETCH_REQUEST,
  token
})

export const doGetSubscription = (items) => ({
  type: FETCH_SUCCESS,
  items
})
