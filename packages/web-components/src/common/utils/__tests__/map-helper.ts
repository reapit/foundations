import { getLatLng, getContent, createMarker, formatPriceAndQuantifier, getPrice } from '../map-helper'
import { property } from '../__mocks__/property'
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
    it('should return value when property address empty', () => {
      const newProperty = {
        ...property,
        address: {},
      }
      const result = getLatLng(newProperty)
      expect(result).toEqual({ latitude: undefined, longitude: undefined })
    })
  })

  describe('getContent', () => {
    const latitude = property?.address?.geolocation?.latitude
    const longitude = property?.address?.geolocation?.longitude
    const marketingMode = property?.marketingMode
    const address = {
      line1: property?.address?.line1 || '',
      line2: property?.address?.line2 || '',
    }

    const lettingPrice = property?.letting?.rent
    const rentFrequency = property?.letting?.rentFrequency

    const bedrooms = property?.bedrooms
    const bathrooms = property?.bathrooms

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
        price: '',
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
        price: '',
      })
      expect(result).toMatchSnapshot()
    })
  })

  describe('createMarker', () => {
    it('should run correctly', () => {
      const mockGoogleMap = createGoogleMapsMock()
      const mockMap = new mockGoogleMap.Map()
      const mockInfoWindow = new mockGoogleMap.InfoWindow({
        content: 'mockContent',
      })
      const result = createMarker({
        property,
        map: mockMap,
        infoWindows: [mockInfoWindow],
        propertyImages: [],
        searchType: 'Rent',
      })
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
})
