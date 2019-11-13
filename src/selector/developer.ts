import { ReduxState } from '@/types/core'

export const selectDeveloperId = (state: ReduxState) => {
  return state?.auth?.loginSession?.loginIdentity?.developerId
}
