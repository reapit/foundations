import { errorClearedComponent, errorClearedServer, errorThrownComponent, errorThrownServer } from '../error'
import ActionTypes from '../../constants/action-types'
import { ErrorData } from '../../reducers/error'
import errorMessages from '../../constants/error-messages'

describe('error actions', () => {
  it('should create a errorClearedComponent action', () => {
    expect(errorClearedComponent.type).toEqual(ActionTypes.ERROR_CLEARED_COMPONENT)
    expect(errorClearedComponent(null).data).toEqual(null)
  })

  it('should create a errorClearedServer action', () => {
    expect(errorClearedServer.type).toEqual(ActionTypes.ERROR_CLEARED_SERVER)
    expect(errorClearedServer(null).data).toEqual(null)
  })

  it('should create a errorThrownComponent action', () => {
    const errorData = {
      type: 'COMPONENT',
      message: errorMessages.DEFAULT_COMPONENT_ERROR
    } as ErrorData
    expect(errorThrownComponent.type).toEqual(ActionTypes.ERROR_THROWN_COMPONENT)
    expect(errorThrownComponent(errorData).data).toEqual(errorData)
  })

  it('should create a errorThrownServer action', () => {
    const errorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR
    } as ErrorData
    expect(errorThrownServer.type).toEqual(ActionTypes.ERROR_THROWN_SERVER)
    expect(errorThrownServer(errorData).data).toEqual(errorData)
  })
})
