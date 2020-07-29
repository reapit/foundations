import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'

export const selectDesktopIntegrationTypes = (state: ReduxState): DesktopIntegrationTypeModel[] => {
  return state?.desktopIntegrationTypes?.list?.data || []
}
