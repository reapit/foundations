import { ReduxState } from '@/types/core'

export const selectUserCode = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.userCode || ''
}

export const selectUserLoginStatus = (state: ReduxState) => {
  return !!state?.auth?.refreshSession || !!state?.auth?.loginSession
}

export const selectLoginMode = (state: ReduxState) => {
  return state?.auth?.refreshSession?.mode || 'WEB'
}
