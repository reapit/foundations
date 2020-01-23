import * as React from 'react'
import { shallow } from 'enzyme'
import { MapPanel, MapPanelProps, mapStateToProps, mapDispatchToProps, getMapUrl } from '../map-panel'
import toJson from 'enzyme-to-json'
import { ReduxState } from '@/types/core'
import invalidValues from '@/constants/invalid-values'

const { UNDEFINED_LATLNG_NUMBER } = invalidValues

describe('MapPanel', () => {
  describe('getMapUrl', () => {
    describe('valid current and destination location', () => {
      it('handles correctly iOS map', () => {
        const input = { currentLocation: { lng: 1, lat: 1 }, destination: { lng: 1, lat: 1 } }
        const output = `maps://maps.google.com/maps?saddr=${input.currentLocation.lat},${input.currentLocation.lng}&daddr=${input.destination.lat},${input.destination.lng}`
        expect(getMapUrl(input)).toBe(output)
      })

      it('handles correctly web map', () => {
        const input = { currentLocation: { lng: 1, lat: 1 }, destination: { lng: 1, lat: 1 }, isIOS: false }
        const output = `https://maps.google.com/maps?saddr=${input.currentLocation.lat},${input.currentLocation.lng}&daddr=${input.destination.lat},${input.destination.lng}`
        expect(getMapUrl(input)).toBe(output)
      })
    })

    describe('invalid current location', () => {
      it('handles invalid current location', () => {
        const input = {
          currentLocation: { lng: UNDEFINED_LATLNG_NUMBER, lat: UNDEFINED_LATLNG_NUMBER },
          destination: { lng: 1, lat: 1 },
        }
        const output = `maps://maps.google.com/maps?daddr=${input.destination.lat},${input.destination.lng}`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles no current location lat', () => {
        const input = { currentLocation: { lng: 1, lat: undefined }, destination: { lng: 1, lat: 1 } }
        const output = `maps://maps.google.com/maps?daddr=${input.destination.lat},${input.destination.lng}`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles invalid current location lat', () => {
        const input = { currentLocation: { lng: undefined, lat: 1 }, destination: { lng: 1, lat: 1 } }
        const output = `maps://maps.google.com/maps?daddr=${input.destination.lat},${input.destination.lng}`
        expect(getMapUrl(input)).toBe(output)
      })
    })

    describe('invalid destination', () => {
      it('handles invalid destination location', () => {
        const input = { destination: { lng: undefined, lat: undefined }, currentLocation: { lng: 1, lat: 1 } }
        const output = `maps://maps.google.com/maps?saddr=${input.currentLocation.lat},${input.currentLocation.lng}&`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles no destination location lat', () => {
        const input = { destination: { lng: 1, lat: undefined }, currentLocation: { lng: 1, lat: 1 } }
        const output = `maps://maps.google.com/maps?saddr=${input.currentLocation.lat},${input.currentLocation.lng}&`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles invalud destination location lat', () => {
        const input = { destination: { lng: undefined, lat: 1 }, currentLocation: { lng: 1, lat: 1 } }
        const output = `maps://maps.google.com/maps?saddr=${input.currentLocation.lat},${input.currentLocation.lng}&`
        expect(getMapUrl(input)).toBe(output)
      })
    })
  })

  it('should match a snapshot when valid LAT, LONG', () => {
    const props: MapPanelProps = {
      duration: '15 mins',
      distance: '3 miles',
      currentLocation: { lat: 52.522905940278065, lng: -1.241455078125 },
      destination: { lat: 52.158215, lng: -0.433459 },
      filterType: 'Today',
      showAllAppointment: jest.fn(),
      isDesktopMode: false,
    }
    expect(toJson(shallow(<MapPanel {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when invalid LAT, LONG', () => {
    const props: MapPanelProps = {
      duration: '15 mins',
      distance: '3 miles',
      currentLocation: { lat: 52.522905940278065, lng: -1.241455078125 },
      destination: { lat: undefined, lng: undefined },
      filterType: 'Today',
      showAllAppointment: jest.fn(),
      isDesktopMode: false,
    }
    expect(toJson(shallow(<MapPanel {...props} />))).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const state = {
        appointments: {
          time: 'Today',
        },
        auth: {
          refreshSession: {
            mode: 'DESKTOP',
          },
        },
      } as ReduxState
      const expected = {
        filterType: 'Today',
        isDesktopMode: true,
      }
      const result = mapStateToProps(state)
      expect(result).toEqual(expected)
    })

    it('should return when undefined', () => {
      const state = {} as ReduxState
      const expected = {
        filterType: 'Today',
        isDesktopMode: false,
      }
      const result = mapStateToProps(state)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const { showAllAppointment } = mapDispatchToProps(mockDispatch)
      showAllAppointment()
      expect(mockDispatch).toBeCalled()
    })
  })
})
