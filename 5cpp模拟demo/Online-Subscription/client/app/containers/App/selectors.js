import { createSelector } from 'reselect'

const selectRoute = (state) => state.get('route')
const selectGlobal = (state) => state.get('global')

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
)

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
)

const makeSelectMsg = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('msg')
)

const makeSelectMsgType = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('msgType')
)

export {
  makeSelectLocation,
  makeSelectLoading,
  makeSelectMsg,
  makeSelectMsgType
}
