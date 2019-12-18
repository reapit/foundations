import { errorClearedComponent, errorClearedServer, errorThrownServer, errorThrownComponent } from '../error'
import ActionTypes from '../../constants/action-types'

describe('error actions', () => {
  it('should create correct actions', () => {
    expect(errorClearedComponent.type).toEqual(ActionTypes.ERROR_CLEARED_COMPONENT)
    expect(errorClearedServer.type).toEqual(ActionTypes.ERROR_CLEARED_SERVER)
    expect(errorThrownComponent.type).toEqual(ActionTypes.ERROR_THROWN_COMPONENT)
    expect(errorThrownServer.type).toEqual(ActionTypes.ERROR_THROWN_SERVER)
  })
})
