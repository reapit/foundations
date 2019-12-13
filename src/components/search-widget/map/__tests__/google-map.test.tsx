import * as React from 'react'
import { property } from '../mock-property'
import createGoogleMapsMock from '../mock-google-map'
import {
  getContent,
  handleUseEffect,
  MapContainer,
  renderMap,
  GoogleMap,
  getLatLng,
  createMarker,
  clearMap,
  MarkersRef,
  MapRef,
  getCurrentMarkerIndex
} from '../google-map'
import { shallow } from 'enzyme'
import { theme } from '@searchWidget/theme'
import { SearchStore } from '@searchWidget/hooks/search-store'

describe('google-map', () => {
  const latitude =
    property &&
    property.address &&
    property.address.geolocation &&
    property.address.geolocation.latitude
  const longitude =
    property &&
    property.address &&
    property.address.geolocation &&
    property.address.geolocation.longitude
  const marketingMode = property && property.marketingMode
  const address = {
    line1:
      property && property.address && property.address.line1
        ? property.address.line1
        : '',
    line2:
      property && property.address && property.address.line2
        ? property.address.line2
        : ''
  }

  const lettingPrice = property && property.letting && property.letting.rent
  const rentFrequency =
    property && property.letting && property.letting.rentFrequency

  const bedrooms = property && property.bedrooms
  const bathrooms = property && property.bathrooms

  const mockGoogleMap = createGoogleMapsMock()
  const mockMap = new mockGoogleMap.Map()
  const mockCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 }
  const mockZoom = 8
  const mockMarker = new mockGoogleMap.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: mockMap
  })
  const mockCenterPoint = new mockGoogleMap.LatLng(latitude, longitude)
  const mockMapRef: MapRef = {
    current: mockMap
  }
  const mockMarkersRef: MarkersRef = {
    current: [mockMarker]
  }
  const mockSearchStore: SearchStore = {
    result: {
      _embedded: [property]
    },
    propertyImages: {
      AYL190002: {
        id: 'AYL190002',
        url:
          'https://reapit-dev.s3.eu-west-2.amazonaws.com/pictures/RPT/19/RPT190222_01.jpg'
      }
    },
    isLoading: false,
    err: null,
    searchKeyWord: '',
    searchType: 'Rent',
    setStartFetching: jest.fn(),
    setFetchResult: jest.fn(),
    setFetchError: jest.fn(),
    setPropertyImages: jest.fn(),
    setSearchKeyWord: jest.fn(),
    setSelectedProperty: jest.fn(),
    getCountResult: jest.fn(),
    getErrorString: jest.fn(),
    getResultArr: jest.fn(),
    selectedProperty: property
  }

  const mockProperties = [property]

  describe('getContent', () => {
    it('should run correctly', () => {
      const result = getContent({
        latitude,
        longitude,
        marketingMode,
        address,
        lettingPrice,
        rentFrequency,
        bedrooms,
        bathrooms,
        theme,
        price: ''
      })
      expect(result).toMatchSnapshot()
    })
    it('should run correctly', () => {
      const result = getContent({
        latitude,
        longitude,
        marketingMode: 'abc',
        address,
        lettingPrice,
        rentFrequency,
        bedrooms,
        bathrooms,
        theme,
        price: ''
      })
      expect(result).toMatchSnapshot()
    })
  })

  describe('getLatLng', () => {
    it('should run correctly', () => {
      const result = getLatLng(property)
      expect(result).toEqual({
        latitude:
          property.address &&
          property.address.geolocation &&
          property.address.geolocation.latitude,
        longitude:
          property.address &&
          property.address.geolocation &&
          property.address.geolocation.longitude
      })
    })
    it('should return value when property address empty', () => {
      const newProperty = {
        ...property,
        address: {}
      }
      const result = getLatLng(newProperty)
      expect(result).toEqual({ latitude: undefined, longitude: undefined })
    })
  })

  describe('createMarker', () => {
    it('should run correctly', () => {
      const result = createMarker({
        property,
        googleMap: mockGoogleMap,
        map: mockMapRef.current,
        searchStore: mockSearchStore,
        theme
      })
      expect(result).toBeDefined()
    })
  })

  describe('clearMap', () => {
    it('should run correctly', () => {
      clearMap({
        markersRef: mockMarkersRef
      })
      expect(mockMarker.setMap).toBeCalled()
    })
  })

  describe('getCurrentMarkerIndex', () => {
    it('should run correctly', () => {
      const result = getCurrentMarkerIndex({
        markersRef: mockMarkersRef,
        centerPoint: mockCenterPoint
      })
      expect(result).toEqual(null)
    })
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const fn = handleUseEffect({
        googleMap: mockGoogleMap,
        center: mockCenter,
        zoom: mockZoom,
        property,
        mapRef: mockMapRef,
        restProps: undefined,
        theme,
        searchStore: mockSearchStore,
        markersRef: mockMarkersRef,
        properties: mockProperties
      })
      fn()
      expect(mockGoogleMap.Marker).toBeCalled()
      expect(mockGoogleMap.Map).toBeCalled()
      expect(mockGoogleMap.LatLng).toBeCalled()
    })

    it('should run correctly when no property', () => {
      const fn = handleUseEffect({
        googleMap: mockGoogleMap,
        center: mockCenter,
        zoom: mockZoom,
        property: undefined,
        mapRef: mockMapRef,
        restProps: undefined,
        theme,
        searchStore: mockSearchStore,
        markersRef: mockMarkersRef,
        properties: mockProperties
      })
      fn()
      expect(mockGoogleMap.Marker).toBeCalled()
      expect(mockGoogleMap.Map).toBeCalled()
      expect(mockGoogleMap.LatLngBounds).toBeCalled()
    })

    it('should run correctly', () => {
      const fn = handleUseEffect({
        googleMap: mockGoogleMap,
        center: mockCenter,
        zoom: mockZoom,
        property,
        mapRef: mockMapRef,
        restProps: undefined,
        theme,
        searchStore: mockSearchStore,
        markersRef: mockMarkersRef,
        properties: undefined
      })
      fn()
      expect(mockGoogleMap.Marker).toBeCalled()
      expect(mockGoogleMap.Map).toBeCalled()
      expect(mockGoogleMap.LatLngBounds).toBeCalled()
      expect(mockGoogleMap.LatLng).toBeCalled()
    })
  })

  describe('MapContainer', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <MapContainer
          googleMap={mockGoogleMap}
          center={mockCenter}
          zoom={mockZoom}
          property={property}
        />
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderMap', () => {
    it('should match snapshot', () => {
      const component = renderMap({
        property,
        zoom: mockZoom,
        center: mockCenter,
        properties: mockProperties
      })({ googleMap: mockGoogleMap, error: null })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('GoogleMap', () => {
    const mockParams = {
      key: 'mockKey'
    }
    const wrapper = shallow(
      <GoogleMap
        params={mockParams}
        property={property}
        zoom={mockZoom}
        center={mockCenter}
        properties={mockProperties}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
