import { createSelector } from 'reselect'

/**
 * Direct selector to the fifthStep state domain
 */
const selectFifthStepDomain = (state) => state.get('fifthStep')

/**
 * Other specific selectors
 */


/**
 * Default selector used by FifthStep
 */

const makeSelectFifthStep = () => createSelector(
  selectFifthStepDomain,
  (substate) => substate.toJS()
)

export default makeSelectFifthStep
export {
  selectFifthStepDomain,
}
