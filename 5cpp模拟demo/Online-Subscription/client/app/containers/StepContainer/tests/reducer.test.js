
import { fromJS } from 'immutable'
import stepContainerReducer from '../reducer'

describe('stepContainerReducer', () => {
  it('returns the initial state', () => {
    expect(stepContainerReducer(undefined, {})).toEqual(fromJS({}))
  })
})
