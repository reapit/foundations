import { ReduxState } from '@/types/core'

export const selectSettingsPageIsLoading = (state: ReduxState) => {
  return state?.settings?.loading || false
}
