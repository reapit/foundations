import React, { ChangeEvent, MouseEvent } from 'react'
import { render } from '../../../tests/react-testing'
import {
  MyLocation,
  fetchLocationResults,
  handleFetchLocationResults,
  handleSetLocationQuery,
  handleCloseResults,
  handleSelectResult,
  handleGeoLocateMe,
} from '../my-location'
import { AppState, defaultAppState } from '../../../../core/app-state'
import { AppStateParams, GeocoderResult, MapRefs } from '../../map/types'
import { DebouncedFunc } from 'lodash'
import { getGeoCoords } from '../../../../utils/map-utils'

jest.mock('../../../../core/app-state')
jest.mock('../../../../utils/map-utils', () => ({
  getGeoCoords: jest.fn(() => ({
    lat: 1234,
    lng: 1234,
  })),
}))

describe('MyLocation', () => {
  it('should match snapshot', () => {
    expect(render(<MyLocation />)).toMatchSnapshot()
  })
})

describe('fetchLocationResults', () => {
  it('should set app state with location results', () => {
    const mockSetAppState = jest.fn()
    const mockGeoCode = jest.fn()
    const mockAppState = {
      ...defaultAppState,
      locationQueryAddress: 'Some address',
      mapRefs: {
        googleMapsRef: {
          current: {
            Geocoder: jest.fn(() => ({
              geocode: mockGeoCode,
            })),
          },
        },
      } as unknown as MapRefs,
    } as AppState

    fetchLocationResults({ appState: mockAppState, setAppState: mockSetAppState })

    expect(mockGeoCode).toHaveBeenCalledTimes(1)
    expect(mockGeoCode.mock.calls[0][0]).toEqual({ address: mockAppState.locationQueryAddress, region: 'GB' })
  })
})

describe('handleFetchLocationResults', () => {
  it('should call the debounce function correctly', () => {
    const mockDebounce = jest.fn()
    const mockAppState = defaultAppState
    const mockSetAppState = jest.fn()

    const curried = handleFetchLocationResults({
      appState: mockAppState,
      setAppState: mockSetAppState,
      debouncedGeolocate: mockDebounce as unknown as DebouncedFunc<({ appState, setAppState }: AppStateParams) => void>,
    })
    curried()

    expect(mockDebounce).toHaveBeenCalledWith({ appState: mockAppState, setAppState: mockSetAppState })
  })
})

describe('handleSetLocationQuery', () => {
  it('should set app state correctly', () => {
    const mockEvent = {
      persist: jest.fn(),
      target: {
        value: 'SOME_VALUE',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const mockSetAppState = jest.fn()

    const curried = handleSetLocationQuery(mockSetAppState)
    curried(mockEvent)

    expect(mockEvent.persist).toHaveBeenCalled()
    expect(mockSetAppState.mock.calls[0][0]()).toEqual({
      locationQueryAddress: mockEvent.target.value,
    })
  })
})

describe('handleCloseResults', () => {
  it('should set app state correctly', () => {
    const mockEvent = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<SVGSVGElement>
    const mockSetAppState = jest.fn()

    const curried = handleCloseResults(mockSetAppState)
    curried(mockEvent)

    expect(mockEvent.stopPropagation).toHaveBeenCalled()
    expect(mockSetAppState.mock.calls[0][0]()).toEqual({
      locationQueryAddress: null,
      locationQueryResults: [],
    })
  })
})

describe('handleSelectResult', () => {
  it('should set app state correctly', () => {
    const mockEvent = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLDivElement>
    const mockSetAppState = jest.fn()
    const mockGeoCodeResult = {
      formatted_address: 'SOME_ADDRESS',
      geometry: {
        location: {
          lat: jest.fn(() => 1234),
          lng: jest.fn(() => 1234),
        },
      },
    } as unknown as GeocoderResult

    const curried = handleSelectResult(mockSetAppState, mockGeoCodeResult)
    curried(mockEvent)

    expect(mockEvent.stopPropagation).toHaveBeenCalled()
    expect(mockSetAppState.mock.calls[0][0]()).toEqual({
      locationQueryAddress: null,
      locationQueryResults: [],
      locationAddress: mockGeoCodeResult.formatted_address,
      currentLat: mockGeoCodeResult.geometry.location.lat(),
      currentLng: mockGeoCodeResult.geometry.location.lng(),
    })
  })
})

describe('handleGeoLocateMe', () => {
  it('should set app state correctly', async () => {
    const mockSetAppState = jest.fn()

    const curried = handleGeoLocateMe(mockSetAppState)
    await curried()

    expect(getGeoCoords).toHaveBeenCalledTimes(1)
    expect(mockSetAppState.mock.calls[0][0]()).toEqual({
      lat: 1234,
      lng: 1234,
    })
  })
})
