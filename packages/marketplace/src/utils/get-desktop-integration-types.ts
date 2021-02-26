import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'

export const getDesktopIntegrationTypes = (
  desktopIntegrationTypeIds: string[],
  desktopIntegrationTypes: DesktopIntegrationTypeModel[],
) =>
  desktopIntegrationTypes.filter((desktopIntegrationType) =>
    desktopIntegrationTypeIds.includes(desktopIntegrationType.id || ''),
  )
