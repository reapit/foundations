import { ReduxState } from '@/types/core'

export const selectDeveloperId = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity.developerId
}

export const selectDeveloperEmail = (state: ReduxState) => {
  return state?.settings?.developerInfomation?.email
}
