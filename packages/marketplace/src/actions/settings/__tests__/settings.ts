import { settingLoadingVisibility, changePassword } from '../settings'
import ActionTypes from '@/constants/action-types'

describe('settings actions', () => {
  it('should create a settingShowLoading action', () => {
    expect(settingLoadingVisibility.type).toEqual(ActionTypes.SETTING_LOADING_VISIBILITY)
    expect(settingLoadingVisibility(true).data).toEqual(true)
  })

  it('should create a changePassword action', () => {
    expect(changePassword.type).toEqual(ActionTypes.CHANGE_PASSWORD)
    const mockPassword = { currentPassword: '', password: '', confirmPassword: '', email: '' }
    expect(changePassword(mockPassword).data).toEqual(mockPassword)
  })
})
