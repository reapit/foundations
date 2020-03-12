import React from 'react'
import { shallow } from 'enzyme'
import createGoogleMapsMock from '../../../helpers/mock-google-maps'
import {
  renderMarkers,
  getCurrentLocation,
  renderDirection,
  handleRequestDirectionServiceResponse,
  setZoomAndCenter,
  renderDirectionAndMarkers,
  handleOnLoaded,
  renderMap,
  handleUseEffect,
  clearMap,
  Map,
} from '../index'

describe('Map', () => {
  let mockCoordinates: any[] = []
  const mockGoogleMaps = createGoogleMapsMock()
  let mockPosition: any = null
  let mockMap: any = null
  let mockDestinationPoint: any = null
  let mockDirectionsService: any = null
  let mockDirectionsRenderer: any = null
  let travelMode = 'DRIVING'
  let mockOnLoadedDirection = jest.fn()
  let markerCallBack = jest.fn()
  let mockCurrentLocation: any = null
  let mockBounds: any = null
  let mockMarker: any = null
  let mockMarkers: any[] = []
  const mockDrawingManager: any = null
  const mockDrawingOptions: any = null
  const mockLibrary: any = null
  const mockOnDrawingMarkerClick = jest.fn()
  const mockOnDrawingMarkerComplete = jest.fn()
  const mockOnDrawingPolygonClick = jest.fn()
  const mockOnDrawingPolygonComplete = jest.fn()
  const mockMarkerComponent = () => <div>Test</div>
  const mockError = new Error('some error')
  const currentLocationLatLng = {
    lat: 0,
    lng: 0,
  }
  beforeEach(() => {
    mockCoordinates = [
      {
        position: { lat: 0, lng: 0 },
      },
      { position: { lat: 1, lng: 1 } },
    ]
    mockPosition = {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    }
    mockMap = new mockGoogleMaps.Map()
    mockDirectionsService = new mockGoogleMaps.DirectionsService()
    mockDirectionsRenderer = new mockGoogleMaps.DirectionsRenderer()
    mockDestinationPoint = {
      position: { lat: 0, lng: 0 },
    }
    mockCurrentLocation = new mockGoogleMaps.LatLng(currentLocationLatLng.lat, currentLocationLatLng.lng)
    mockBounds = new mockGoogleMaps.LatLngBounds()
    mockMarker = new mockGoogleMaps.Marker({
      position: {
        lat: 0,
        lng: 0,
      },
      label: 'mock marker',
      map: mockMap,
    })
    mockMarkers = [mockMarker]
  })
  describe('renderMarkers', () => {
    it('should run correctly', () => {
      const result = renderMarkers({
        coordinates: mockCoordinates,
        googleMaps: mockGoogleMaps,
        map: mockMap,
        markerCallBack,
      })
      expect(result).toHaveLength(2)
    })
  })

  describe('getCurrentLocation', () => {
    it('should run correctly', () => {
      const result = getCurrentLocation({ position: mockPosition, googleMaps: mockGoogleMaps, map: mockMap })
      expect(result).toBeDefined()
    })
  })

  describe('handleRequestDirectionServiceResponse', () => {
    it('should run correctly', () => {
      const fn = handleRequestDirectionServiceResponse({
        currentLocation: mockCurrentLocation,
        onLoadedDirection: mockOnLoadedDirection,
        directionsRenderer: mockDirectionsRenderer,
        destinationAddress: '',
      })
      const mockResponse = {}
      const mockStatus = 'OK'
      fn(mockResponse, mockStatus)
      expect(mockCurrentLocation.setMap).toBeCalledWith(null)
      expect(mockOnLoadedDirection).toBeCalledWith(mockResponse)
      expect(mockDirectionsRenderer.setDirections).toBeCalled()
    })

    it('should run correctly', () => {
      const fn = handleRequestDirectionServiceResponse({
        currentLocation: mockCurrentLocation,
        onLoadedDirection: mockOnLoadedDirection,
        directionsRenderer: mockDirectionsRenderer,
        destinationAddress: '',
      })
      const mockResponse = {}
      const mockStatus = 'ERROR'
      fn(mockResponse, mockStatus)
      expect(window.alert).toBeCalled()
    })
  })

  describe('renderDirection', () => {
    it('should run correctly', () => {
      renderDirection({
        destinationPoint: mockDestinationPoint,
        map: mockMap,
        position: mockPosition,
        googleMaps: mockGoogleMaps,
        directionsService: mockDirectionsService,
        directionsRenderer: mockDirectionsRenderer,
        travelMode,
        onLoadedDirection: mockOnLoadedDirection,
        currentLocation: mockCurrentLocation,
        destinationAddress: '',
      })
      expect(mockDirectionsRenderer.setMap).toBeCalled()
      expect(mockDirectionsService.route).toBeCalled()
    })
  })

  describe('setZoomAndCenter', () => {
    it('should run correctly', () => {
      setZoomAndCenter({
        bounds: mockBounds,
        center: undefined,
        zoom: undefined,
        map: mockMap,
        markers: mockMarkers,
        googleMaps: mockGoogleMaps,
      })
      expect(mockMap.fitBounds).toBeCalledWith(mockBounds)
      expect(mockMap.setCenter).toBeCalledWith(mockBounds.getCenter())
    })

    it('should not call setCenter and fitBounds', () => {
      setZoomAndCenter({
        bounds: mockBounds,
        center: {},
        zoom: 10,
        map: mockMap,
        markers: mockMarkers,
        googleMaps: mockGoogleMaps,
      })
      expect(mockMap.fitBounds).not.toBeCalledWith(mockBounds)
      expect(mockMap.setCenter).not.toBeCalledWith(mockBounds.getCenter())
    })

    it('should not call fitBounds', () => {
      setZoomAndCenter({
        bounds: mockBounds,
        center: undefined,
        zoom: 10,
        map: mockMap,
        markers: mockMarkers,
        googleMaps: mockGoogleMaps,
      })
      expect(mockMap.fitBounds).not.toBeCalledWith(mockBounds)
      expect(mockMap.setCenter).toBeCalledWith(mockBounds.getCenter())
    })

    it('should not call setCenter', () => {
      setZoomAndCenter({
        bounds: mockBounds,
        center: {},
        zoom: undefined,
        map: mockMap,
        markers: mockMarkers,
        googleMaps: mockGoogleMaps,
      })
      expect(mockMap.fitBounds).toBeCalledWith(mockBounds)
      expect(mockMap.setCenter).not.toBeCalledWith(mockBounds.getCenter())
    })

    it('should not call setCenter', () => {
      setZoomAndCenter({
        bounds: mockBounds,
        center: {},
        zoom: undefined,
        map: mockMap,
        markers: [],
        googleMaps: mockGoogleMaps,
      })
      expect(mockMap.setZoom).toBeCalledWith(10)
      expect(mockMap.setCenter).toBeCalled()
    })
  })

  describe('renderDirectionAndMarkers', () => {
    it('should run correctly', () => {
      renderDirectionAndMarkers({
        googleMapsRef: {
          current: mockGoogleMaps,
        },
        mapRef: {
          current: mockMap,
        },
        coordinates: mockCoordinates,
        center: undefined,
        zoom: undefined,
        destinationPoint: mockDestinationPoint,
        travelMode,
        onLoadedDirection: mockOnLoadedDirection,
        markersRef: {
          current: mockMarkers,
        },
        directionsRendererRef: {
          current: mockDirectionsRenderer,
        },
        directionsServiceRef: {
          current: mockDirectionsService,
        },
        boundsRef: mockBounds,
        markerCallBack,
        destinationAddress: '',
      })
      expect(mockMap.fitBounds).not.toBeCalledWith(mockBounds)
      expect(mockMap.setCenter).not.toBeCalledWith(mockBounds.getCenter())
    })
  })

  describe('handleOnLoaded', () => {
    it('should run correctly', () => {
      const fn = handleOnLoaded({
        googleMapsRef: {
          current: mockGoogleMaps,
        },
        mapRef: {
          current: mockMap,
        },
        directionsRendererRef: {
          current: mockDirectionsRenderer,
        },
        directionsServiceRef: {
          current: mockDirectionsService,
        },
        boundsRef: mockBounds,
        onLoaded: mockOnLoadedDirection,
        drawingManagerRef: {
          current: mockDrawingManager,
        },
        drawingOptions: mockDrawingOptions,
        libraries: mockLibrary,
        onDrawingMarkerClick: mockOnDrawingMarkerClick,
        onDrawingMarkerComplete: mockOnDrawingMarkerComplete,
        onDrawingPolygonClick: mockOnDrawingPolygonClick,
        onDrawingPolygonComplete: mockOnDrawingPolygonComplete,
      })
      fn(mockGoogleMaps, mockMap)
      expect(mockOnLoadedDirection).toBeCalled()
    })
  })

  describe('renderMap', () => {
    it('should run correctly', () => {
      const fn = renderMap({
        mapContainerStyles: '',
        googleMapsRef: {
          current: mockGoogleMaps,
        },
        mapRef: {
          current: mockMap,
        },
        onLoaded: mockOnLoadedDirection,
        directionsRendererRef: {
          current: mockDirectionsRenderer,
        },
        boundsRef: {
          current: mockBounds,
        },
        directionsServiceRef: {
          current: mockDirectionsService,
        },
        center: {},
        zoom: 10,
        coordinates: mockCoordinates,
        component: mockMarkerComponent,
        drawingManagerRef: {
          current: mockDrawingManager,
        },
        drawingOptions: mockDrawingOptions,
        libraries: mockLibrary,
        onDrawingMarkerClick: mockOnDrawingMarkerClick,
        onDrawingMarkerComplete: mockOnDrawingMarkerComplete,
        onDrawingPolygonClick: mockOnDrawingPolygonClick,
        onDrawingPolygonComplete: mockOnDrawingPolygonComplete,
      })
      const component = fn(mockGoogleMaps, undefined)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('t')).toHaveLength(1)
    })
    it('should run correctly when error', () => {
      const fn = renderMap({
        mapContainerStyles: '',
        googleMapsRef: {
          current: mockGoogleMaps,
        },
        mapRef: {
          current: mockMap,
        },
        onLoaded: mockOnLoadedDirection,
        directionsRendererRef: {
          current: mockDirectionsRenderer,
        },
        boundsRef: {
          current: mockBounds,
        },
        directionsServiceRef: {
          current: mockDirectionsService,
        },
        center: {},
        zoom: 10,
        coordinates: mockCoordinates,
        component: mockMarkerComponent,
        drawingManagerRef: {
          current: mockDrawingManager,
        },
        drawingOptions: mockDrawingOptions,
        libraries: mockLibrary,
        onDrawingMarkerClick: mockOnDrawingMarkerClick,
        onDrawingMarkerComplete: mockOnDrawingMarkerComplete,
        onDrawingPolygonClick: mockOnDrawingPolygonClick,
        onDrawingPolygonComplete: mockOnDrawingPolygonComplete,
      })
      const component = fn(mockGoogleMaps, mockError)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should run correctly when error network', () => {
      const fn = renderMap({
        mapContainerStyles: '',
        googleMapsRef: {
          current: mockGoogleMaps,
        },
        mapRef: {
          current: mockMap,
        },
        onLoaded: mockOnLoadedDirection,
        directionsRendererRef: {
          current: mockDirectionsRenderer,
        },
        boundsRef: {
          current: mockBounds,
        },
        directionsServiceRef: {
          current: mockDirectionsService,
        },
        center: {},
        zoom: 10,
        coordinates: mockCoordinates,
        component: mockMarkerComponent,
        drawingManagerRef: {
          current: mockDrawingManager,
        },
        drawingOptions: mockDrawingOptions,
        libraries: mockLibrary,
        onDrawingMarkerClick: mockOnDrawingMarkerClick,
        onDrawingMarkerComplete: mockOnDrawingMarkerComplete,
        onDrawingPolygonClick: mockOnDrawingPolygonClick,
        onDrawingPolygonComplete: mockOnDrawingPolygonComplete,
      })
      const component = fn(mockGoogleMaps, new Error('Network Error'))
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const fn = handleUseEffect({
        googleMapsRef: {
          current: mockGoogleMaps,
        },
        mapRef: {
          current: mockMap,
        },
        destinationPoint: mockDestinationPoint,
        onLoadedDirection: mockOnLoadedDirection,
        directionsRendererRef: {
          current: mockDirectionsRenderer,
        },
        boundsRef: {
          current: mockBounds,
        },
        directionsServiceRef: {
          current: mockDirectionsService,
        },
        center: {},
        zoom: 10,
        coordinates: mockCoordinates,
        travelMode,
        markersRef: {
          current: mockMarkers,
        },
        markerCallBack,
        destinationAddress: '',
      })
      expect(fn).toBeDefined()
      const result = fn()
      expect(result).toBeDefined()
    })

    it('should run correctly', () => {
      const result = handleUseEffect({
        googleMapsRef: {
          current: mockGoogleMaps,
        },
        mapRef: {
          current: mockMap,
        },
        destinationPoint: mockDestinationPoint,
        onLoadedDirection: mockOnLoadedDirection,
        directionsRendererRef: null,
        boundsRef: {
          current: mockBounds,
        },
        directionsServiceRef: {
          current: mockDirectionsService,
        },
        center: {},
        zoom: 10,
        coordinates: mockCoordinates,
        travelMode,
        markersRef: null,
        markerCallBack,
        destinationAddress: '',
      })
      expect(result).toBeDefined()
    })
  })

  describe('clearMap', () => {
    it('should run correctly', () => {
      const fn = clearMap({
        directionsRendererRef: {
          current: mockDirectionsRenderer,
        },
        markersRef: {
          current: mockMarkers,
        },
      })
      fn()
      expect(mockDirectionsRenderer.setMap).toBeCalledWith(null)
      expect(mockMarker.setMap).toBeCalledWith(null)
    })
    it('should run correctly', () => {
      const fn = clearMap({
        directionsRendererRef: null,
        markersRef: null,
      })
      fn()
      expect(mockDirectionsRenderer.setMap).not.toBeCalledWith(null)
      expect(mockMarker.setMap).not.toBeCalledWith(null)
    })
  })
  describe('Map', () => {
    it('should match snapshot', () => {
      const mockProps = {
        apiKey: 'MOCK_API_KEY',
        libraries: 'places',
        coordinates: mockCoordinates,
        component: mockMarkerComponent,
        center: {},
        zoom: 10,
        onLoaded: jest.fn(),
        destinationPoint: mockDestinationPoint,
        travelMode: 'DRIVING',
        onLoadedDirection: mockOnLoadedDirection,
      }
      const wrapper = shallow(<Map {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
