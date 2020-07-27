import { DesktopIntegrationTypeModel } from '@/actions/desktop-integration-types'

export const getDesktopIntegrationTypes = (
  desktopIntegrationTypeIds: string[],
  desktopIntegrationTypes: DesktopIntegrationTypeModel[],
) =>
  desktopIntegrationTypes.filter(desktopIntegrationType =>
    desktopIntegrationTypeIds.includes(desktopIntegrationType.id || ''),
  )
