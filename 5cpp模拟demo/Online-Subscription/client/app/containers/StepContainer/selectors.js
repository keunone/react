import { createSelector } from 'reselect'

/**
 * Direct selector to the stepContainer state domain
 */
const selectStepContainerDomain = (state) => state.get('stepContainer')

/**
 * Other specific selectors
 */


/**
 * Default selector used by StepContainer
 */

const makeSelectStepContainer = () => createSelector(
  selectStepContainerDomain,
  (substate) => substate.toJS()
)

export default makeSelectStepContainer
export {
  selectStepContainerDomain,
}
