import { ReduxState } from '@/types/core'

export const selectClientId = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.clientId || ''
}

export const selectLoggedUserEmail = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.email
}

export const selectAppSummary = (state: ReduxState) => {
  return state?.client.appSummary
}

export const selectFeaturedApps = (state: ReduxState) => {
  return state?.client.appSummary.data?.featuredApps || []
}
