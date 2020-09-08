import { ExtendedAppointmentModel } from '@/types/global'
import qs from 'query-string'

export type FetchDestinationInformation = {
  queryParams: qs.ParsedQuery<string>
  appointment: ExtendedAppointmentModel
}

export const fetchDestinationInformation = ({ queryParams, appointment }: FetchDestinationInformation) => {
  return new Promise(resolve => {
    if (window.google) {
      const origins = [new google.maps.LatLng(queryParams.currentLat, queryParams.currentLng)]
      const destinations = [
        new google.maps.LatLng(
          appointment?.property?.address?.geolocation?.latitude || 1,
          appointment?.property?.address?.geolocation?.longitude || 1,
        ),
      ]

      const service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix(
        {
          origins,
          destinations,
          travelMode: queryParams.travelMode || google.maps.TravelMode.DRIVING,
        },
        response => {
          resolve(response)
        },
      )
    }
  })
}
