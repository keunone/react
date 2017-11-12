
import { FETCH_REQUEST, FETCH_SUCCESS } from './constants'

export const doCheckById = (id) => ({
  type: FETCH_REQUEST,
  id
})

export const doGetDetail = (item) => ({
  type: FETCH_SUCCESS,
  item
})
