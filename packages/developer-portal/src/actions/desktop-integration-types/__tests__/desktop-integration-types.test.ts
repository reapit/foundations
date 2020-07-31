import {
  fetchDesktopIntegrationTypeList,
  fetchDesktopIntegrationTypeListFailed,
  fetchDesktopIntegrationTypeListSuccess,
} from '../desktop-integration-types'
import ActionTypes from '@/constants/action-types'

describe('scope list actions', () => {
  it('should create a fetchDesktopIntegrationTypeList action', () => {
    expect(fetchDesktopIntegrationTypeList.type).toEqual(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST)
  })

  it('should create a fetchDesktopIntegrationTypeListSuccess action', () => {
    expect(fetchDesktopIntegrationTypeListSuccess.type).toEqual(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST_SUCCESS)
  })

  it('should create a fetchDesktopIntegrationTypeListFailed action', () => {
    expect(fetchDesktopIntegrationTypeListFailed.type).toEqual(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST_FAILED)
  })
})
