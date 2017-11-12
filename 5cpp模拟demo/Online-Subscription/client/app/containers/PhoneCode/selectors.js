import { createSelector } from 'reselect'

const getauthCode = (state) => state.get('authCode')

export const makeSelectPhone = () => createSelector(
  getauthCode,
  (authCode) => authCode.get('phone')
)

export const makeSelectCode = () => createSelector(
  getauthCode,
  (authCode) => authCode.get('code')
)

export const makeSelectExp = () => createSelector(
  getauthCode,
  (authCode) => authCode.get('exp')
)

export const makeSelectToken = () => createSelector(
  getauthCode,
  (authCode) => authCode.get('token')
)
