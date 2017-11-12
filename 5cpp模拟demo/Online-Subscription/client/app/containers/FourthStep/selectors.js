import { createSelector } from 'reselect'

const selectFourthStepDomain = (state) => state.get('fourthStep')

const makeSelectFourthStep = () => createSelector(
  selectFourthStepDomain,
  (fourthStep) => fourthStep.get('orderCode')
)

const makeSelectCheckState = () => createSelector(
  selectFourthStepDomain,
  (fourthStep) => fourthStep.get('CheckState')
)

export {
  selectFourthStepDomain,
  makeSelectCheckState,
  makeSelectFourthStep
}
