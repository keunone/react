import { createSelector } from 'reselect'

const selectFirstStepDomain = (state) => state.get('firstStep')

// const makeSelectSex = () => createSelector(
//   selectFirstStepDomain,
//   (firstStep) => firstStep.get('sex')
// )

// const makeSelectUsername = () => createSelector(
//   selectFirstStepDomain,
//   (firstStep) => firstStep.get('username')
// )

// const makeSelectYear = () => createSelector(
//   selectFirstStepDomain,
//   (firstStep) => firstStep.get('year')
// )

// const makeSelectMonth = () => createSelector(
//   selectFirstStepDomain,
//   (firstStep) => firstStep.get('month')
// )

// const makeSelectDay = () => createSelector(
//   selectFirstStepDomain,
//   (firstStep) => firstStep.get('day')
// )

// const makeSelectAddress = () => createSelector(
//   selectFirstStepDomain,
//   (firstStep) => firstStep.get('sex')
// )

// const makeSelectProvince = () => createSelector(
//   selectFirstStepDomain,
//   (firstStep) => firstStep.get('province')
// )

const makeSelectFirstStepData = () => createSelector(
  selectFirstStepDomain,
  (firstStep) => firstStep.get('firstStepData')
)
export {
  selectFirstStepDomain,
  // makeSelectSex,
  // makeSelectUsername,
  // makeSelectYear,
  // makeSelectMonth,
  // makeSelectDay,
  // makeSelectAddress,
  // makeSelectProvince
  makeSelectFirstStepData
}
