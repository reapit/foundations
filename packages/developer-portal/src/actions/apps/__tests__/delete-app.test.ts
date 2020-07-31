import ActionTypes from '@/constants/action-types'
import { deleteApp, deleteAppSuccess, deleteAppFailed } from '../delete-app'

describe('deleteApp actions', () => {
  it('should delete a deleteApp action', () => {
    expect(deleteApp.type).toEqual(ActionTypes.DELETE_APP)
  })
  it('should delete a deleteAppSuccess action', () => {
    expect(deleteAppSuccess.type).toEqual(ActionTypes.DELETE_APP_SUCCESS)
  })
  it('should delete a deleteAppFailed action', () => {
    expect(deleteAppFailed.type).toEqual(ActionTypes.DELETE_APP_FAILED)
  })
})
