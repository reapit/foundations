import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  Map,
  renderHandler,
  onLoadedMapHandler,
  renderMarker,
  onLoadedMarkerHandler,
  handleOnClickMarker
} from '../index'

describe('Map', () => {
  describe('Map', () => {
    it('should render correctly', () => {
      const mockProps = {
        apiKey: 'mockKey',
        libraries: 'places,geometry',
        markers: [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }],
        defaultCenter: { lat: 10.806203, lng: 106.666807 },
        defaultZoom: 16
      }
      const wrapper = shallow(<Map {...mockProps} />)
      expect(toJson(wrapper)).toMatchSnapshot()
      expect(wrapper.find('GoogleMapsLoader')).toHaveLength(1)
    })
    it('should render correctly when marker undefined', () => {
      const mockProps = {
        apiKey: 'mockKey',
        libraries: 'places,geometry',
        markers: [],
        defaultCenter: { lat: 10.806203, lng: 106.666807 },
        defaultZoom: 16
      }
      const wrapper = shallow(<Map {...mockProps} />)
      expect(toJson(wrapper)).toMatchSnapshot()
      expect(wrapper.find('GoogleMapsLoader')).toHaveLength(1)
    })
  })

  describe('renderHandler', () => {
    it('should render correctly when no error', () => {
      const mockParams1 = {
        markers: [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }],
        defaultCenter: { lat: 10.806203, lng: 106.666807 },
        defaultZoom: 16
      }
      const fn = renderHandler(mockParams1.markers, mockParams1.defaultCenter, mockParams1.defaultZoom)
      const mockParams2 = {
        googleMaps: {
          Point: jest.fn(),
          Size: jest.fn(),
          InfoWindow: jest.fn(),
          event: {
            addListener: jest.fn()
          }
        },
        error: null
      }
      const map = fn(mockParams2.googleMaps, mockParams2.error)
      const wrapper = shallow(<div>{map}</div>)
      expect(wrapper.find('[data-test="map-container"]')).toHaveLength(1)
      expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('should render correctly when error', () => {
      const mockParams1 = {
        markers: [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }],
        defaultCenter: { lat: 10.806203, lng: 106.666807 },
        defaultZoom: 16
      }
      const fn = renderHandler(mockParams1.markers, mockParams1.defaultCenter, mockParams1.defaultZoom)
      const mockParams2 = {
        googleMaps: {},
        error: new Error('Some Error')
      }
      const map = fn(mockParams2.googleMaps, mockParams2.error)
      const wrapper = shallow(<div>{map}</div>)
      expect(wrapper.find('[data-test="error-container"]')).toHaveLength(1)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })

  describe('onLoadedMapHandler', () => {
    it('should run correctly', () => {
      const mockGoogleMaps = {
        MapTypeId: {
          ROADMAP: 'roadmap'
        }
      }
      const mockMap = {
        setMapTypeId: jest.fn()
      }
      onLoadedMapHandler(mockGoogleMaps, mockMap)
      expect(mockMap.setMapTypeId).toBeCalledWith(mockGoogleMaps.MapTypeId.ROADMAP)
    })
  })
  describe('renderMarker', () => {
    it('should run correctly', () => {
      const mockParams = {
        markers: [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }],
        googleMaps: {
          Point: jest.fn(),
          Size: jest.fn()
        }
      }
      const markers = renderMarker(mockParams.googleMaps, mockParams.markers)
      expect(markers).toHaveLength(1)
    })
    it('should run correctly when marker undefined', () => {
      const mockParams = {
        googleMaps: {
          Point: jest.fn(),
          Size: jest.fn()
        }
      }
      const markers = renderMarker(mockParams.googleMaps, undefined)
      expect(markers).toHaveLength(0)
    })
  })
  describe('onLoadedMarkerHandler', () => {
    it('should run correctly', () => {
      const mockParams = {
        markerItem: { lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' },
        googleMaps: {
          Point: jest.fn(),
          Size: jest.fn(),
          InfoWindow: jest.fn(),
          event: {
            addListener: jest.fn()
          }
        },
        marker: null,
        map: null
      }
      const fn = onLoadedMarkerHandler(mockParams.markerItem)
      fn(mockParams.googleMaps, mockParams.map, mockParams.marker)
      expect(mockParams.googleMaps.event.addListener).toBeCalled()
    })
  })
  describe('handleOnClickMarker', () => {
    it('should run correctly', () => {
      const infoWindow = {
        open: jest.fn()
      }
      const map = null
      const marker = null
      const fn = handleOnClickMarker(infoWindow, map, marker)
      fn()
      expect(infoWindow.open).toBeCalledWith(map, marker)
    })
  })
})
