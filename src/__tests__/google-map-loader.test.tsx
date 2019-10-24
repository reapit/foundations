import React from 'react'
import { loadedCallback, GoogleMapLoader } from '../map/google-map-loader'
import { shallow } from 'enzyme'

describe('GoogleMapLoader', () => {
  describe('loadedCallback', () => {
    it('should call setError', () => {
      const mockSetError = jest.fn()
      const mockSetGoogleMap = jest.fn()
      const fn = loadedCallback({
        setError: mockSetError,
        setGoogleMap: mockSetGoogleMap
      })
      fn('mockError')
      expect(mockSetError).toBeCalledWith('mockError')
    })

    it('should call setGoogleMap', () => {
      const mockSetError = jest.fn()
      const mockSetGoogleMap = jest.fn()
      const fn = loadedCallback({
        setError: mockSetError,
        setGoogleMap: mockSetGoogleMap
      })
      fn(undefined)
      expect(mockSetGoogleMap).toBeCalled()
    })
  })

  describe('GoogleMapLoader', () => {
    it('should match snapshot', () => {
      const mockProps = {
        params: { key: '123' },
        render: jest.fn()
      }
      const wrapper = shallow(<GoogleMapLoader {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
