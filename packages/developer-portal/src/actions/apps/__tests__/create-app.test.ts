import ActionTypes from '@/constants/action-types'
import { createApp, createAppSuccess, createAppFailed } from '../create-app'

describe('createApp actions', () => {
  it('should create a createApp action', () => {
    expect(createApp.type).toEqual(ActionTypes.CREATE_APP)
  })
  it('should create a createAppSuccess action', () => {
    expect(createAppSuccess.type).toEqual(ActionTypes.CREATE_APP_SUCCESS)
  })
  it('should create a createAppFailed action', () => {
    expect(createAppFailed.type).toEqual(ActionTypes.CREATE_APP_FAILED)
  })
})
