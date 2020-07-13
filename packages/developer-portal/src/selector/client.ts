import { ReduxState } from '@/types/core'
import { selectLoginIdentity } from '@/selector/auth'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'

export const selectClientId = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.clientId || ''
}

/**
 * Need get developer id to filter apps list if this user belong to
 * AgencyCloudDeveloperEdition group, if not just return null
 * refer to this ticket https://github.com/reapit/foundations/issues/1848
 */
export const selectDeveloperEditionId = (state: ReduxState) => {
  const loginIdentity = selectLoginIdentity(state)
  if (loginIdentity?.groups.includes(COGNITO_GROUP_DEVELOPER_EDITION)) {
    return state?.auth?.loginSession?.loginIdentity?.developerId || ''
  }
  return null
}

export const selectLoggedUserEmail = (state: ReduxState): string => {
  return state?.auth?.loginSession?.loginIdentity?.email || ''
}
