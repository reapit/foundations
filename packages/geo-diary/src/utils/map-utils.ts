import { ExtendedAppointmentModel } from '../types/global'
import { AppState } from '../core/app-state'

export type FetchDestinationInformation = {
  appointment: ExtendedAppointmentModel
  appState: AppState
}

export const fetchDestinationInformation = ({
  appointment,
  appState,
}: FetchDestinationInformation): Promise<google.maps.DistanceMatrixResponse> => {
  const { currentLat, currentLng, travelMode } = appState
  return new Promise((resolve) => {
    if (window.google) {
      const origins = [new google.maps.LatLng(currentLat, currentLng)]
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
          travelMode: travelMode as google.maps.TravelMode,
        },
        (response) => {
          resolve(response)
        },
      )
    }
  })
}
