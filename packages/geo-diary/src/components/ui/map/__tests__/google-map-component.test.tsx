import React from 'react'
import { render } from '../../../tests/react-testing'
import {
  clearMap,
  GoogleMapComponent,
  handleDirectionService,
  handleFilterCoordinates,
  handleMarkerClick,
  handleOnLoaded,
  handleRenderDirections,
  handleRenderMarkers,
  handleRenderMyLocation,
  handleSetAppointment,
  handleSetMapRefs,
  renderInfoWindowContent,
} from '../google-map-component'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { combineAddress } from '@reapit/elements-legacy'
import { AppState, defaultAppState } from '../../../../core/app-state'
import { DirectionsResult, MapRefs } from '../types'

const appointments = mockAppointmentsQuery.data.GetAppointments._embedded as ExtendedAppointmentModel[]

jest.mock('../../../../core/app-state')

const mockGetMarkerPostion = jest.fn()
const mockSetDirection = jest.fn()
const mockGetCenter = jest.fn()
const mockGeoCode = jest.fn()
const mockMarker = jest.fn(() => ({ getPostition: mockGetMarkerPostion }))
const mockGeoCoder = jest.fn(() => ({
  geocode: mockGeoCode,
}))
const mockInfoWindow = jest.fn()
const mockAddListener = jest.fn()
const mockLatLngBounds = jest.fn(() => ({ getCenter: mockGetCenter }))
const mockGetPostion = jest.fn()
const mockFitBounds = jest.fn()
const mockSetCenter = jest.fn()
const mockLatLng = jest.fn()
const mockSetMap = jest.fn()
const mockRoute = jest.fn()
const mockDirectionsRenderer = {
  setDirections: mockSetDirection,
  setMap: mockSetMap,
}
export const mockDirectionsService = {
  route: mockRoute,
}
const mockDirectionsRendererConstructor = jest.fn()
const mockDirectionsServiceConstructor = jest.fn()
export const mockAppState = {
  ...defaultAppState,
  currentLat: 1234,
  currentLng: 1234,
  destinationLat: 1234,
  destinationLng: 1234,
  mapRefs: {
    mapRef: {
      current: {
        setCenter: mockSetCenter,
        fitBounds: mockFitBounds,
      },
    },
    googleMapsRef: {
      current: {
        Marker: mockMarker,
        InfoWindow: mockInfoWindow,
        LatLngBounds: mockLatLngBounds,
        LatLng: mockLatLng,
        DirectionsService: mockDirectionsServiceConstructor,
        DirectionsRenderer: mockDirectionsRendererConstructor,
        Geocoder: mockGeoCoder,
        event: {
          addListener: mockAddListener,
        },
      },
    },
    markersRef: {
      current: [],
    },
    myLocationRef: {
      current: {
        getPosition: mockGetPostion,
      },
    },
    boundsRef: {
      current: {
        getCenter: mockGetCenter,
      },
    },
    directionsRendererRef: {
      current: mockDirectionsRenderer,
    },
    directionsServiceRef: {
      current: mockDirectionsService,
    },
  },
} as unknown as AppState

describe('GoogleMapComponent', () => {
  it('should match snapshot with an appointment', () => {
    expect(render(<GoogleMapComponent appointments={appointments} />)).toMatchSnapshot()
  })

  it('should handle set appointment', () => {
    const setAppState = jest.fn()
    const appointment = appointments[2]
    const curried = handleSetAppointment({
      appointments,
      setAppState,
      appointmentId: appointment.id ?? null,
    })

    curried()

    const newState = setAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointment,
      destinationLat: appointment.property?.address?.geolocation?.latitude,
      destinationLng: appointment.property?.address?.geolocation?.longitude,
      destinationAddress: combineAddress(appointment?.property?.address),
    })
  })

  it('should handle marker click', () => {
    const setAppState = jest.fn()
    const appointmentId = appointments[2].id ?? ''
    handleMarkerClick({
      appointmentId,
      setAppState,
    })

    const newState = setAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointmentId,
    })
  })

  it('should render an info  window string', () => {
    const params = { latlng: { lat: 231332, lng: 232131 }, address: 'SOME_ADDRESS' }
    const result = renderInfoWindowContent(params)

    expect(result.includes(params.address)).toBe(true)
    expect(result.includes(String(params.latlng.lat))).toBe(true)
    expect(result.includes(String(params.latlng.lng))).toBe(true)
  })

  it('should handle render of markers', () => {
    const mockSetAppState = jest.fn()
    const mockCoordinates = handleFilterCoordinates(appointments)()
    const coordinatesLength = mockCoordinates.length
    const curried = handleRenderMarkers({
      coordinates: mockCoordinates,
      appState: mockAppState,
      setAppState: mockSetAppState,
    })

    curried()
    expect(coordinatesLength).toBe(5)
    expect(mockAppState.mapRefs?.markersRef.current.length).toEqual(coordinatesLength)
    expect(mockAppState.mapRefs?.googleMapsRef.current?.Marker).toHaveBeenCalledTimes(coordinatesLength)
    expect(mockAppState.mapRefs?.googleMapsRef.current?.InfoWindow).toHaveBeenCalledTimes(coordinatesLength)
  })

  it('should handle render of location', () => {
    const mockSetAppState = jest.fn()
    const curried = handleRenderMyLocation({
      appState: mockAppState,
      setAppState: mockSetAppState,
    })
    mockGeoCoder.mockImplementation(() => ({ geocode: mockGeoCode }))
    curried()
    expect(mockAppState.mapRefs?.googleMapsRef.current?.Marker).toHaveBeenCalledTimes(1)
    expect(mockGeoCode).toHaveBeenCalledTimes(1)
    expect(mockGeoCode.mock.calls[0][0]).toEqual({ location: { lat: 1234, lng: 1234 } })
  })

  it('should handle directions service', () => {
    const mockSetAppState = jest.fn()
    const mockResponse = {
      routes: [
        {
          legs: [
            {
              duration: '120mins',
              distance: '120miles',
            },
          ],
        },
      ],
    } as unknown as DirectionsResult
    const curried = handleDirectionService({
      appState: mockAppState,
      setAppState: mockSetAppState,
    })

    curried(mockResponse, 'OK' as google.maps.DirectionsStatus)
    expect(mockSetAppState.mock.calls[0][0]()).toEqual({
      routeInformation: {
        duration: '120mins',
        distance: '120miles',
      },
    })
  })

  it('should handle render directions', () => {
    const mockSetAppState = jest.fn()
    const curried = handleRenderDirections({
      appState: mockAppState,
      setAppState: mockSetAppState,
    })

    curried()
    expect(mockDirectionsService.route).toHaveBeenCalledTimes(1)
    expect(mockDirectionsRenderer.setMap).toHaveBeenCalledTimes(1)
  })

  it('should clear map', () => {
    const mockSetAppState = jest.fn()

    clearMap(mockAppState, mockSetAppState)

    expect(mockDirectionsRenderer.setMap).toHaveBeenCalledTimes(1)
    expect(mockSetAppState.mock.calls[0][0]()).toEqual({
      routeInformation: null,
      destinationAddress: null,
    })
  })

  it('should handle set map refs', () => {
    const mockSetAppState = jest.fn()

    const curried = handleSetMapRefs({
      appState: {} as AppState,
      setAppState: mockSetAppState,
      mapRefs: mockAppState.mapRefs as MapRefs,
    })

    curried()

    expect(mockSetAppState.mock.calls[0][0]()).toEqual({
      mapRefs: mockAppState.mapRefs,
    })
  })

  it('should handle map load', () => {
    const curried = handleOnLoaded({
      mapRef: {
        current: {},
      },
      googleMapsRef: {
        current: {},
      },
      markersRef: {
        current: [],
      },
      myLocationRef: {
        current: {},
      },
      boundsRef: {
        current: {},
      },
      directionsRendererRef: {
        current: {},
      },
      directionsServiceRef: {
        current: {},
      },
    } as unknown as MapRefs)

    curried(
      mockAppState.mapRefs?.googleMapsRef.current as typeof google.maps,
      mockAppState.mapRefs?.mapRef.current as google.maps.Map,
    )

    expect(mockLatLngBounds).toHaveBeenCalledTimes(1)
    expect(mockDirectionsServiceConstructor).toHaveBeenCalledTimes(1)
    expect(mockDirectionsRendererConstructor).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
