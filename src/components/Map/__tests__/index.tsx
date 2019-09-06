import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import createGoogleMapsMock from '../../../helpers/mock-google-maps'
import {
  Map,
  renderHandler,
  onLoadedMapHandler,
  handleOnClickMarker,
  renderMarkerContent,
  successCallBack,
  renderDirection
} from '../index'

const MarkerInfoComponent = () => {
  return (
    <div>
      <h1>Test title</h1>
      <div
        onClick={() => {
          console.log('click')
        }}
      >
        Test content
      </div>
    </div>
  )
}

describe('Map', () => {
  describe('Map', () => {
    it('should render correctly', () => {
      const mockProps = {
        apiKey: 'mockKey',
        libraries: 'places,geometry',
        markers: [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }],
        defaultCenter: { lat: 10.806203, lng: 106.666807 },
        defaultZoom: 16,
        component: MarkerInfoComponent
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
        defaultZoom: 16,
        component: MarkerInfoComponent
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
        defaultZoom: 16,
        autoFitBounds: true,
        boundsOffset: 10
      }
      const fn = renderHandler({
        component: MarkerInfoComponent,
        ...mockParams1
      })
      const mockParams2 = {
        googleMaps: createGoogleMapsMock(),
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
      const fn = renderHandler({ component: MarkerInfoComponent, ...mockParams1 })
      const mockParams2 = {
        googleMaps: createGoogleMapsMock(),
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
      const mockProps = {
        markers: [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }],
        destinationPoint: { lat: 10.806203, lng: 106.666807 },
        travelMode: 'DRIVING',
        onLoaded: jest.fn(),
        onLoadedDirection: jest.fn(),
        defaultCenter: { lat: 10.806203, lng: 106.666807}
      }
      const mockParams = {
        map: {
          setMapTypeId: jest.fn()
        },
        googleMaps: createGoogleMapsMock(),
      }
      const fn = onLoadedMapHandler({ ...mockProps })
      fn(mockParams.googleMaps, mockParams.map)
      expect(mockProps.onLoaded).toBeCalled()
    })
  })

  describe('successCallBack', () => {
    it('should run correctly', () => {
      const mockDirectionRenderer = {
        setMap: jest.fn(),
        setDirections: jest.fn()
      }
      const mockProps = {
        markers: [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }],
        destinationPoint: { lat: 10.806203, lng: 106.666807 },
        travelMode: 'DRIVING',
        googleMaps: createGoogleMapsMock(),
        map: jest.fn(),
        onLoadedDirection: jest.fn(),
        defaultCenter: { lat: 10.806203, lng: 106.666807}
      }
      const mockPosition = {
        coords: {
          latitude: 10.806203,
          longtitude: 106.666807
        }
      } as any
      const fn = successCallBack({ ...mockProps })
      fn(mockPosition)
      expect(mockProps.googleMaps.Marker).toBeCalled()
    })
  })

  describe('handleOnClickMarker', () => {
    it('should run correctly', () => {
      const infoWindow = {
        open: jest.fn()
      }
      const map = null
      const marker = {
        getPosition: jest.fn()
      }
      const markerItem = { lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }
      const fn = handleOnClickMarker(infoWindow, map, marker, markerItem)
      fn()
      expect(infoWindow.open).toBeCalledWith(map, marker)
    })
  })

  describe('renderMarkerContent', () => {
    it('should run correctly', () => {
      const markers = [{ lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' }]
      const result = renderMarkerContent(markers, MarkerInfoComponent)
      expect(result).toHaveLength(1)
    })
  })
})
