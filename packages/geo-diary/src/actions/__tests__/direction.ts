import { setDestination } from '../direction'
import ActionTypes from '../../constants/action-types'

describe('Direction actions', () => {
  it('should create a appointmentsLoading action', () => {
    expect(setDestination.type).toEqual(ActionTypes.SET_DESTINATION)
    expect(setDestination({}).data).toEqual({})
  })
})
