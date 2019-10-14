import React from 'react'
import { property } from '../map/mock-property'
import createGoogleMapsMock from '../map/mock-google-map'
import { getContent, handleUseEffect, MapContainer, renderMap, GoogleMap } from '../map/google-map'
import { shallow } from 'enzyme'

describe('google-map', () => {
  const latitude = property && property.address && property.address.geolocation && property.address.geolocation.latitude
  const longitude = property && property.address && property.address.geolocation && property.address.geolocation.longitude
  const marketingMode = property && property.marketingMode
  const address = property && property.address && property.address.line2 ?  property.address.line2 : ''
  const qualifier = property && property.selling && property.selling.qualifier
  const sellingPrice = property && property.selling && property.selling.price

  const lettingPrice = property && property.letting && property.letting.rent
  const rentFrequency = property && property.letting && property.letting.rentFrequency

  const bedrooms = property && property.bedrooms
  const bathrooms = property && property.bathrooms

  const mockGoogleMap = createGoogleMapsMock()
  const mockCenter = {lat: 0, lng: 0}
  const mockZoom = 8
  const mockMapRef = {
    current: null
  }

  describe('getContent', () => {
    it('should run correctly', () => {
      const result = getContent({
        latitude,
        longitude,
        marketingMode,
        address,
        qualifier,
        sellingPrice,
        lettingPrice,
        rentFrequency,
        bedrooms,
        bathrooms,
      })
      expect(result).toMatchSnapshot()
    })
    it('should run correctly', () => {
      const result = getContent({
        latitude,
        longitude,
        marketingMode: 'abc',
        address,
        qualifier,
        sellingPrice,
        lettingPrice,
        rentFrequency,
        bedrooms,
        bathrooms,
      })
      expect(result).toMatchSnapshot()
    })
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const fn = handleUseEffect({ googleMap: mockGoogleMap, center: mockCenter, zoom: mockZoom, property, mapRef: mockMapRef, restProps: undefined })
      fn()
      expect(mockGoogleMap.Marker).toBeCalled()
    })
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const fn = handleUseEffect({ googleMap: mockGoogleMap, center: mockCenter, zoom: mockZoom, property, mapRef: mockMapRef, restProps: undefined })
      fn()
      expect(mockGoogleMap.Marker).toBeCalled()
    })
  })

  describe('MapContainer', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<MapContainer googleMap={mockGoogleMap} center={mockCenter} zoom={mockZoom} property={property} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderMap', () => {
    it('should match snapshot', () => {
      const component = renderMap({ property, zoom: mockZoom, center: mockCenter })({googleMap: mockGoogleMap, error: null})
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('GoogleMap', () => {
    const mockParams = {
      key: 'mockKey'
    }
    const wrapper = shallow(<GoogleMap params={mockParams} property={property} zoom={mockZoom} center={mockCenter} />)
    expect(wrapper).toMatchSnapshot()
  })
})