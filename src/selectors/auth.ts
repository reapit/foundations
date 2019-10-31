import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectUserCode = (state: ReduxState) => {
  return oc(state).auth.loginSession.loginIdentity.userCode('')
}

export const selectUserLoginStatus = (state: ReduxState) => {
  return !!oc(state).auth.refreshSession() || !!oc(state).auth.loginSession()
}

export const checkIsDesktopMode = (state: ReduxState) => {
  return oc(state).auth.refreshSession.mode() === 'DESKTOP'
}

export const checkIsWebMode = (state: ReduxState) => {
  return oc(state).auth.refreshSession.mode() === 'WEB'
}

export const selectLoginMode = (state: ReduxState) => {
  return oc(state).auth.refreshSession.mode('WEB')
}
