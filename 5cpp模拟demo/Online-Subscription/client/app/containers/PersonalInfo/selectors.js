import { createSelector } from 'reselect'

const selectSecondStep = (state) => state.get('secondStep')
const selectAuthCode = (state) => state.get('authCode')

const makeSelectEmail = () => createSelector(
  selectSecondStep,
  (secondStep) => secondStep.get('userInfo').get('email')
)

const makeSelectPassword = () => createSelector(
  selectSecondStep,
  (secondStep) => secondStep.get('userInfo').get('password')
)

const makeSelectAuthCode = () => createSelector(
  selectAuthCode,
  (authCode) => authCode
)

const makeSelectSecondeStep = () => createSelector(
  [selectSecondStep, selectAuthCode],
  (secondStep, authCode) => ({
    mail: secondStep.get('userInfo').get('email'),
    password: secondStep.get('userInfo').get('password'),
    phone: authCode.get('phone'),
  })
)

export {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectAuthCode,
  makeSelectSecondeStep,
}
