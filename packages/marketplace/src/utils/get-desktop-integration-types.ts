import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'

export const getDesktopIntegrationTypes = (
  desktopIntegrationTypeIds: string[],
  desktopIntegrationTypes: DesktopIntegrationTypeModel[],
) =>
  desktopIntegrationTypes.filter(desktopIntegrationType =>
    desktopIntegrationTypeIds.includes(desktopIntegrationType.id || ''),
  )
