import {
  fetchtAppAuthentication,
  fetchtAppAuthenticationSuccess,
  fetchtAppAuthenticationFailed,
  clearAppAuthentication,
} from '../app-authentication'
import ActionTypes from '@/constants/action-types'

describe('app authentication actions', () => {
  it('should create a fetchtAppAuthentication action', () => {
    expect(fetchtAppAuthentication.type).toEqual(ActionTypes.REQUEST_AUTHENTICATION_CODE)
  })

  it('should create a fetchtAppAuthenticationSuccess action', () => {
    expect(fetchtAppAuthenticationSuccess.type).toEqual(ActionTypes.REQUEST_AUTHENTICATION_CODE_SUCCESS)
  })

  it('should create a fetchtAppAuthenticationFailed action', () => {
    expect(fetchtAppAuthenticationFailed.type).toEqual(ActionTypes.REQUEST_AUTHENTICATION_CODE_FAILURE)
  })
  it('should create a removeAuthenticationCode action', () => {
    expect(clearAppAuthentication.type).toEqual(ActionTypes.REMOVE_AUTHENTICATION_CODE)
  })
})
