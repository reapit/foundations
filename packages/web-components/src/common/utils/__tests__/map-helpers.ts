import {
  getLatLng,
  getMarker,
  formatPriceAndQuantifier,
  getPrice,
  getInfoWindow,
  centerMapToMarker,
  fitMapToBounds,
} from '../map-helpers'
import { property } from '../__mocks__/property'
import { DEFAULT_CENTER } from '../constants'
import createGoogleMapsMock from '../__mocks__/mock-google-map'

describe('map-helper', () => {
  describe('getLatLng', () => {
    it('should run correctly', () => {
      const result = getLatLng(property)
      expect(result).toEqual({
        latitude: property?.address?.geolocation?.latitude,
        longitude: property?.address?.geolocation?.longitude,
      })
    })
    it('should return default value when property address empty', () => {
      const newProperty = {
        ...property,
        address: {},
      }
      const result = getLatLng(newProperty)
      expect(result).toEqual({ latitude: DEFAULT_CENTER.lat, longitude: DEFAULT_CENTER.lng })
    })
  })

  describe('createMarker', () => {
    it('should run correctly', () => {
      const mockGoogleMap = createGoogleMapsMock()
      const mockMap = new mockGoogleMap.Map()
      const result = getMarker(property, mockMap)
      expect(result).toBeDefined()
    })
  })

  describe('formatPriceAndQuantifier', () => {
    it('runs correctly', () => {
      // 0 = input, 1 = input
      const testCases = [
        ['askingPrice', '£500,000'],
        ['priceOnApplication', 'POA'],
        ['guidePrice', 'Guide Price £500,000'],
        ['offersInRegion', 'OIRO £500,000'],
        ['offersOver', 'Offers Over £500,000'],
        ['offersInExcess', 'OIEO £500,000'],
        ['fixedPrice', 'Fixed Price £500,000'],
        ['priceReducedTo', '£500,000'],
      ]

      for (let testCase of testCases) {
        expect(formatPriceAndQuantifier(500000, testCase[0])).toBe(testCase[1])
      }
    })
  })

  describe('getPrice', () => {
    it('runs correctly', () => {
      expect(getPrice(property, 'Rent')).toEqual('£0 MockRentFrequency')
      expect(getPrice(property, 'Sale')).toEqual('Guide Price £0')
    })
  })

  describe('getMarker', () => {
    it('runs correctly', () => {
      const mockMap = new google.maps.Map(document.body)
      const marker = getMarker(property, mockMap)
      expect(marker).toBeInstanceOf(google.maps.Marker)
    })
  })

  describe('getInfoWindow', () => {
    it('runs correctly', () => {
      const windowInfo = getInfoWindow(property, 'Rent', {})
      expect(windowInfo).toBeInstanceOf(google.maps.InfoWindow)
    })
  })

  describe('centerMapToMarker', () => {
    it('runs correctly', () => {
      const mockMap = new google.maps.Map(document.body)
      centerMapToMarker(property, mockMap)
      expect(mockMap.setCenter).toHaveBeenCalled()
      expect(mockMap.setZoom).toHaveBeenCalled()
    })
  })

  describe('fitMapToBounds', () => {
    it('runs correctly', () => {
      const mockMap = new google.maps.Map(document.body)
      fitMapToBounds([property], mockMap)
      expect(mockMap.fitBounds).toHaveBeenCalled()
    })
  })
})
