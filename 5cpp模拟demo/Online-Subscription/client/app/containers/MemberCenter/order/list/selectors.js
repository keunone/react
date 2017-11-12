import { createSelector } from 'reselect'

const getSubscription = (state) => state.get('memberCenter')
const getUserInfo = (state) => state.get('login').get('userInfo')

export const makeSelectLoading = () => createSelector(
  getSubscription,
  (memberCenter) => memberCenter.get('isLoading')
)

export const makeSelectSubscription = () => createSelector(
  getSubscription,
  (memberCenter) => memberCenter.get('subscription')
)

export const makeSelectToken = () => createSelector(
  getUserInfo,
  (userInfo) => userInfo.get('token')
)
