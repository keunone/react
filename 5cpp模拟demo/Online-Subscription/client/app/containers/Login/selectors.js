/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectLogin = (state) => state.get('login')

const makeSelectLoading = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('isLoading')
)

const makeSelectError = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('error')
)

const makeSelectUserInfo = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('userInfo')
)

export {
  selectLogin,
  makeSelectError,
  makeSelectLoading,
  makeSelectUserInfo,
}
