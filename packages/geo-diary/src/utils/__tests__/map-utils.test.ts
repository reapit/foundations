import { fetchDestinationInformation, getGeoCoords, handleGetRouteInfo } from '../map-utils'
import { mockAppointmentsQuery } from '../../components/pages/appointment/__mocks__/appointments-query'
import { AppState, defaultAppState } from '../../core/app-state'
import { ExtendedAppointmentModel } from '../../types/global'
import { mockAppState, mockDirectionsService } from '../../components/ui/map/__test__/google-map-component.test'

describe('fetchDestinationInformation', () => {
  it('should call the fetch distance matrix', () => {
    const mockGetDistanceMatrix = { getDistanceMatrix: jest.fn() }
    window.google.maps = {
      LatLng: jest.fn(),
      DistanceMatrixService: jest.fn(() => mockGetDistanceMatrix),
    } as any

    const mockAppState = {
      ...defaultAppState,
      currentLat: 1234,
      currentLng: 1234,
    } as AppState

    fetchDestinationInformation({
      appState: mockAppState,
      appointment: mockAppointmentsQuery.data.GetAppointments._embedded[0] as ExtendedAppointmentModel,
    })

    expect(mockGetDistanceMatrix.getDistanceMatrix).toHaveBeenCalledTimes(1)
  })
})

describe('getGeoCoords', () => {
  it('should geoloacate the user', () => {
    Object.defineProperty(navigator, 'geolocation', () => ({
      value: {
        getCurrentPosition: jest.fn(),
      },
    }))

    getGeoCoords()

    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
  })
})

describe('handleGetRouteInfo', () => {
  it('should call the directions service', () => {
    handleGetRouteInfo(mockAppState, 'WALKING')

    expect(mockDirectionsService.route).toHaveBeenCalledTimes(1)
  })
})
