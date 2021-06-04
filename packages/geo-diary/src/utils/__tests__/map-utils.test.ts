import { fetchDestinationInformation } from '../map-utils'
import { mockAppointmentsQuery } from '../../components/pages/appointment/__mocks__/appointments-query'
import { AppState, defaultAppState } from '../../core/app-state'
import { ExtendedAppointmentModel } from '../../types/global'

describe('fetchDestinationInformation', () => {
  it('should call the fetch distance matrix', () => {
    // const mockSetAppState = jest.fn()
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
