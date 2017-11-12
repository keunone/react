
import { fromJS } from 'immutable'
import fourthStepReducer from '../reducer'

describe('fourthStepReducer', () => {
  it('returns the initial state', () => {
    expect(fourthStepReducer(undefined, {})).toEqual(fromJS({}))
  })
})
