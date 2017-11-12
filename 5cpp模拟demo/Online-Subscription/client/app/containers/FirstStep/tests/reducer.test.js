
import { fromJS } from 'immutable'
import firstStepReducer from '../reducer'

describe('firstStepReducer', () => {
  it('returns the initial state', () => {
    expect(firstStepReducer(undefined, {})).toEqual(fromJS({}))
  })
})
