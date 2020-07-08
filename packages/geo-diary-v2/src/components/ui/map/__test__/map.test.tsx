import React from 'react'
import { appointment } from '@/graphql/__mocks__/appointment'
import { shallow } from 'enzyme'
import {
  AppointmentMap,
  UNDEFINED_LATLNG_NUMBER,
  Coordinate,
  filterInvalidMarker,
  handleUseEffect,
  getDestinationPoint,
  handleFilterInvalidMarker,
} from '../map'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => locationMock),
}))

describe('map', () => {
  describe('AppointmentMap', () => {
    it('should match snapshot', () => {
      const mockProps = {
        appointments: [appointment],
        destinationAddress: 'mock Address',
      }
      const wrapper = shallow(<AppointmentMap {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('filterInvalidMarker', () => {
    const markers = ([
      { position: { id: '123', lat: 0, lng: 0 } },
      { position: { id: '3245', lat: 0, lng: 0 } },
      {
        position: {
          id: '67876',
          lat: UNDEFINED_LATLNG_NUMBER,
          lng: UNDEFINED_LATLNG_NUMBER,
        },
      },
    ] as unknown) as Coordinate[]
    const expected = [{ position: { id: '123', lat: 0, lng: 0 } }, { position: { id: '3245', lat: 0, lng: 0 } }]
    const result = filterInvalidMarker(markers)
    expect(result).toEqual(expected)
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const mockProps = {
        queryParams: {},
        history: getMockRouterProps({ params: '', search: '' }).history,
      }
      const fn = handleUseEffect(mockProps)
      fn()
      expect(mockProps.history.push).not.toBeCalled()
    })
  })
  describe('getDestinationPoint', () => {
    it('should run correctly', () => {
      const fn = getDestinationPoint({ destinationLat: '123', destinationLng: '123' })
      const result = fn()
      expect(result).toEqual({ lat: '123', lng: '123' })
    })
  })
  describe('handleFilterInvalidMarker', () => {
    it('should run correctly', () => {
      const appointments = [appointment]
      const fn = handleFilterInvalidMarker(appointments)
      const result = fn()
      expect(result).toEqual([
        {
          address: {
            buildingName: '',
            buildingNumber: '56',
            geolocation: {
              latitude: 52.079532,
              longitude: -0.790871,
            },
            line1: 'High Street',
            line2: 'The Stables',
            line3: 'Old Haversham',
            line4: 'Milton Keynes',
            postcode: 'MK19 7DZ',
          },
          id: 'NEP1600290',
          position: {
            lat: 52.079532,
            lng: -0.790871,
          },
        },
      ])
    })
  })
})
