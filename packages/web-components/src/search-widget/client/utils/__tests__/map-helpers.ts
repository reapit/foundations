import {
  getLatLng,
  getMarker,
  formatPriceAndQuantifier,
  getPrice,
  getInfoWindow,
  centerMapToMarker,
  fitMapToBounds,
} from '../map-helpers'
import { propertyStub } from '../__stubs__/property'
import { DEFAULT_CENTER } from '../../../../common/utils/constants'
import createGoogleMapsMock from '../__mocks__/mock-google-map'
import { generateThemeClasses } from '../../../../common/styles/theme'

describe('map-helper', () => {
  describe('getLatLng', () => {
    it('should run correctly', () => {
      const result = getLatLng(propertyStub)
      expect(result).toEqual({
        latitude: propertyStub?.address?.geolocation?.latitude,
        longitude: propertyStub?.address?.geolocation?.longitude,
      })
    })
    it('should return default value when property address empty', () => {
      const newProperty = {
        ...propertyStub,
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
      const result = getMarker(propertyStub, mockMap)
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
      expect(getPrice(propertyStub, 'Rent')).toEqual('£750 Monthly')
      expect(getPrice(propertyStub, 'Sale')).toEqual('£250,000')
    })
  })

  describe('getMarker', () => {
    it('runs correctly', () => {
      const mockMap = new google.maps.Map(document.body)
      const marker = getMarker(propertyStub, mockMap)
      expect(marker).toBeInstanceOf(google.maps.Marker)
    })
  })

  describe('getInfoWindow', () => {
    it('runs correctly', () => {
      const windowInfo = getInfoWindow(propertyStub, 'Rent', {}, generateThemeClasses({}, '#search-widget'))
      expect(windowInfo).toBeInstanceOf(google.maps.InfoWindow)
    })
  })

  describe('centerMapToMarker', () => {
    it('runs correctly', () => {
      const mockMap = new google.maps.Map(document.body)
      centerMapToMarker(propertyStub, mockMap)
      expect(mockMap.setCenter).toHaveBeenCalled()
      expect(mockMap.setZoom).toHaveBeenCalled()
    })
  })

  describe('fitMapToBounds', () => {
    it('runs correctly', () => {
      const mockMap = new google.maps.Map(document.body)
      fitMapToBounds([propertyStub], mockMap)
      expect(mockMap.fitBounds).toHaveBeenCalled()
    })
  })
})
