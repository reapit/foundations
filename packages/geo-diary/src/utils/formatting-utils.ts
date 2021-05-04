import { PropertyModel } from '@reapit/foundations-ts-definitions'

export const getShortAddress = (property?: PropertyModel) => {
  const line1 = property?.address?.line1 ?? ''
  const buildingName = property?.address?.buildingName ?? ''
  const buildingNumber = property?.address?.buildingNumber ?? ''
  return `${buildingNumber || buildingName || ''} ${line1 || ''}`
}
