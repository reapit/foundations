import * as React from 'react'
import { loadedCallback, GoogleMapLoader } from '../google-map-loader'
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
})
