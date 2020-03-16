import { PropertyModel } from '@reapit/foundations-ts-definitions'

export const getLatLng = (property: PropertyModel) => {
  const latitude = property?.address?.geolocation?.latitude
  const longitude = property?.address?.geolocation?.longitude
  return {
    latitude,
    longitude,
  }
}
