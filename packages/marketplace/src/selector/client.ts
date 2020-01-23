import { ReduxState } from '@/types/core'

export const selectClientId = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.clientId || ''
}

export const selectLoggedUserEmail = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.email
}

export const selectFeaturedApps = (state: ReduxState) => {
  return state?.client?.clientData?.featuredApps || []
}
