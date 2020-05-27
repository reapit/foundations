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

export const selectIsWebComponentOpen = (state: ReduxState) => {
  return state?.client.webComponent?.isShowModal
}

export const selectIsWebComponentData = (state: ReduxState) => {
  return state?.client.webComponent?.data
}

export const selectIsWebComponentLoading = (state: ReduxState) => {
  return state?.client.webComponent?.loading
}

export const selectIsWebComponentUpdating = (state: ReduxState) => {
  return state?.client.webComponent?.updating
}

export const selectIsWebComponentNegotiators = (state: ReduxState) => {
  return state?.client.webComponent?.negotiators?._embedded || []
}

export const selectAppDetail = (state: ReduxState) => {
  return state.appDetail
}

export const selectMyApps = (state: ReduxState): MyAppsState => {
  return state.myApps || {}
}
