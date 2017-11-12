
import { fromJS } from 'immutable'
import fifthStepReducer from '../reducer'

describe('fifthStepReducer', () => {
  it('returns the initial state', () => {
    expect(fifthStepReducer(undefined, {})).toEqual(fromJS({}))
  })
})
