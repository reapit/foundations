import { ReduxState } from '@/types/core'

export const selectIntegrationTypes = (state: ReduxState) => {
  return state?.desktopIntegrationTypes?.data || []
}
