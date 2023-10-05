import { ExtendedAppointmentModel } from '../types/global'
import { AppRouteInformation, AppState, AppTravelMode } from '../core/app-state'
import { DirectionsResult } from '../components/ui/map/types'

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
    if (window.google && currentLat && currentLng) {
      const origins = [new window.google.maps.LatLng(currentLat, currentLng)]
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
          if (response) {
            resolve(response)
          }
        },
      )
    }
  })
}

export const getGeoCoords = (): Promise<Partial<AppState>> => {
  return new Promise((resolve) => {
    const hasGeoLocation = Boolean(navigator.geolocation)
    if (!hasGeoLocation) return resolve({})

    navigator.geolocation.getCurrentPosition(
      (position) => {
        return resolve({
          hasGeoLocation: true,
          currentLat: position.coords.latitude,
          currentLng: position.coords.longitude,
        })
      },
      () => {
        return resolve({})
      },
    )
  })
}

export const handleGetRouteInfo = (
  appState: AppState,
  travelMode: AppTravelMode,
): Promise<AppRouteInformation | null> => {
  const { currentLat, currentLng, destinationLat, destinationLng, mapRefs } = appState
  const googleMaps = mapRefs?.googleMapsRef.current
  const directionsService = mapRefs?.directionsServiceRef?.current
  return new Promise((resolve) => {
    if (googleMaps && directionsService && destinationLat && destinationLng && currentLat && currentLng) {
      const origin = new googleMaps.LatLng(currentLat, currentLng)
      const destination = new googleMaps.LatLng(destinationLat, destinationLng)

      directionsService.route(
        {
          origin,
          destination,
          travelMode: travelMode as google.maps.TravelMode,
        },
        (response: DirectionsResult | null, status: google.maps.DirectionsStatus) => {
          if (status !== 'OK' || !response) {
            resolve(null)
          }

          const { duration, distance } = response?.routes[0].legs[0] ?? {}

          if (distance && duration) {
            resolve({
              duration,
              distance,
            })
          }
        },
      )
    }
  })
}
