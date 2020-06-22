import { ReduxState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'

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

export const selectInstalledApps = (state: ReduxState) => {
  return state?.installedApps
}

export const selectWebComponentOpen = (state: ReduxState) => {
  return state?.client.webComponent?.isShowModal
}

export const selectWebComponentData = (state: ReduxState) => {
  return state?.client.webComponent?.data
}

export const selectWebComponentLoading = (state: ReduxState) => {
  return state?.client.webComponent?.loading
}

export const selectWebComponentUpdating = (state: ReduxState) => {
  return state?.client.webComponent?.updating
}

export const selectWebComponentNegotiators = (state: ReduxState) => {
  return state?.client.webComponent?.negotiators?._embedded || []
}

export const selectAppDetail = (state: ReduxState) => {
  return state.appDetail
}

export const selectMyApps = (state: ReduxState): MyAppsState => {
  return state.myApps || {}
}
