import {
  fetchtAppAuthentication,
  fetchtAppAuthenticationSuccess,
  fetchtAppAuthenticationFailed,
  clearAppAuthentication,
} from '../app-authentication'
import ActionTypes from '@/constants/action-types'

describe('app authentication actions', () => {
  it('should create a fetchtAppAuthentication action', () => {
    expect(fetchtAppAuthentication.type).toEqual(ActionTypes.FETCH_APP_AUTHENTICATION)
  })

  it('should create a fetchtAppAuthenticationSuccess action', () => {
    expect(fetchtAppAuthenticationSuccess.type).toEqual(ActionTypes.FETCH_APP_AUTHENTICATION_SUCCESS)
  })

  it('should create a fetchtAppAuthenticationFailed action', () => {
    expect(fetchtAppAuthenticationFailed.type).toEqual(ActionTypes.FETCH_APP_AUTHENTICATION_FAILED)
  })
  it('should create a removeAuthenticationCode action', () => {
    expect(clearAppAuthentication.type).toEqual(ActionTypes.CLEAR_APP_AUTHENTICATION)
  })
})
