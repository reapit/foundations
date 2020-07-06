import {
  requestDeveloperData,
  requestDeveloperDataSuccess,
  settingShowLoading,
  updateDeveloperData,
  changePassword,
} from '../settings'
import ActionTypes from '../../constants/action-types'
import { developerStub } from '../../sagas/__stubs__/developer'

describe('settings actions', () => {
  it('should create a requestDeveloperData action', () => {
    expect(requestDeveloperData.type).toEqual(ActionTypes.SETTING_FETCH_DEVELOPER_INFO)
    expect(requestDeveloperData().data).toEqual(undefined)
  })

  it('should create a requestDeveloperDataSuccess action', () => {
    expect(requestDeveloperDataSuccess.type).toEqual(ActionTypes.SETTING_FETCH_DEVELOPER_INFO_SUCCESS)
    expect(requestDeveloperDataSuccess(developerStub).data).toEqual(developerStub)
  })

  it('should create a settingShowLoading action', () => {
    expect(settingShowLoading.type).toEqual(ActionTypes.SETTING_SHOW_HIDE_LOADING)
    expect(settingShowLoading(true).data).toEqual(true)
  })
  it('should create a updateDeveloperData action', () => {
    expect(updateDeveloperData.type).toEqual(ActionTypes.SETTING_UPDATE_DEVELOPER)
    expect(updateDeveloperData(developerStub).data).toEqual(developerStub)
  })
  it('should create a changePassword action', () => {
    expect(changePassword.type).toEqual(ActionTypes.CHANGE_PASSWORD)
    const mockPassword = { currentPassword: '', password: '', confirmPassword: '' }
    expect(changePassword(mockPassword).data).toEqual(mockPassword)
  })
})
