import React from 'react'
import { shallow } from 'enzyme'
import MapPanel, { handleChangeTab, getMapUrl, handleOpenNativeMap } from '../map-panel'
import { RouteInformation, UNDEFINED_LATLNG_NUMBER } from '../../map/map'
import { getMockRouterProps } from '../../../../core/__mocks__/mock-router'

const locationMock = { search: '?state=CLIENT&destinationLat=123&destinationLng=123', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Object),
  useLocation: jest.fn(() => locationMock),
}))

describe('map-pannel', () => {
  describe('MapPannel', () => {
    it('should render correctly', () => {
      const mockProps = {
        routeInformation: {
          duration: { text: 'mocktext', value: 19 },
          distance: { text: 'mocktext', value: 11 },
        } as RouteInformation,
      }
      const wrapper = shallow(<MapPanel {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('handleChangeTab', () => {
    it('should run correctly', () => {
      const mockParams = {
        history: getMockRouterProps({ params: {}, search: '' }).history,
        queryParams: {
          time: 'today' as 'today',
          destinationLat: '123',
          destinationLng: '123',
        },
      }
      const fn = handleChangeTab(mockParams)
      fn()
      expect(mockParams.history.push).toBeCalledWith('/?time=today')
    })
  })
  describe('getMapUrl', () => {
    describe('valid current and destination location', () => {
      it('handles correctly iOS map', () => {
        const input = {
          queryParams: {
            currentLat: 1,
            currentLng: 1,
            destinationLat: 1,
            destinationLng: 1,
          },
        }
        const output = `maps://maps.google.com/maps?saddr=${input.queryParams.currentLat},${input.queryParams.currentLng}&daddr=${input.queryParams.destinationLat},${input.queryParams.destinationLng}`
        expect(getMapUrl(input)).toBe(output)
      })

      it('handles correctly web map', () => {
        const input = {
          queryParams: {
            currentLat: 1,
            currentLng: 1,
            destinationLat: 1,
            destinationLng: 1,
          },
          isIOS: false,
        }
        const output = `https://maps.google.com/maps?saddr=${input.queryParams.currentLat},${input.queryParams.currentLng}&daddr=${input.queryParams.destinationLat},${input.queryParams.destinationLng}`
        expect(getMapUrl(input)).toBe(output)
      })
    })

    describe('invalid current location', () => {
      it('handles invalid current location', () => {
        const input = {
          queryParams: {
            currentLat: UNDEFINED_LATLNG_NUMBER,
            currentLng: UNDEFINED_LATLNG_NUMBER,
            destinationLat: 1,
            destinationLng: 1,
          },
        }
        const output = `maps://maps.google.com/maps?daddr=${input.queryParams.destinationLat},${input.queryParams.destinationLng}`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles no current location lat', () => {
        const input = {
          queryParams: {
            currentLat: undefined,
            currentLng: UNDEFINED_LATLNG_NUMBER,
            destinationLat: 1,
            destinationLng: 1,
          },
        }
        const output = `maps://maps.google.com/maps?daddr=${input.queryParams.destinationLat},${input.queryParams.destinationLng}`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles invalid current location lng', () => {
        const input = {
          queryParams: {
            currentLat: UNDEFINED_LATLNG_NUMBER,
            currentLng: undefined,
            destinationLat: 1,
            destinationLng: 1,
          },
        }
        const output = `maps://maps.google.com/maps?daddr=${input.queryParams.destinationLat},${input.queryParams.destinationLng}`
        expect(getMapUrl(input)).toBe(output)
      })
    })

    describe('invalid destination', () => {
      it('handles invalid destination location', () => {
        const input = {
          queryParams: {
            currentLat: 1,
            currentLng: 1,
            destinationLat: UNDEFINED_LATLNG_NUMBER,
            destinationLng: UNDEFINED_LATLNG_NUMBER,
          },
        }
        const output = `maps://maps.google.com/maps?saddr=${input.queryParams.currentLat},${input.queryParams.currentLng}&`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles no destination location lat', () => {
        const input = {
          queryParams: {
            currentLat: 1,
            currentLng: 1,
            destinationLat: undefined,
            destinationLng: 1,
          },
        }
        const output = `maps://maps.google.com/maps?saddr=${input.queryParams.currentLat},${input.queryParams.currentLng}&`
        expect(getMapUrl(input)).toBe(output)
      })
      it('handles invalud destination location lat', () => {
        const input = {
          queryParams: {
            currentLat: 1,
            currentLng: 1,
            destinationLat: 1,
            destinationLng: undefined,
          },
        }
        const output = `maps://maps.google.com/maps?saddr=${input.queryParams.currentLat},${input.queryParams.currentLng}&`
        expect(getMapUrl(input)).toBe(output)
      })
    })
  })

  describe('handleOpenNativeMap', () => {
    it('should run correctly', () => {
      const queryParams = {
        time: 'today' as 'today',
        destinationLat: '123',
        destinationLng: '123',
      }
      const fn = handleOpenNativeMap({ queryParams })
      fn()
      expect(window.open).toBeCalled()
    })
  })
})
