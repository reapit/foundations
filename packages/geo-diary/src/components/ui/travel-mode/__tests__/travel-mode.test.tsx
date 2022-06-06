import React from 'react'
import { render } from '../../../../tests/react-testing'
import { TravelMode, handleChangeTravelMode } from '../travel-mode'
import { AppTravelMode } from '../../../../core/app-state'

jest.mock('../../../../core/app-state')

describe('travel-mode', () => {
  describe('TravelMode', () => {
    it('should match snapshot', () => {
      const wrapper = render(<TravelMode />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleChangeTravelMode', () => {
    it('should run correctly', () => {
      const mockParams = {
        setAppState: jest.fn(),
        travelMode: 'DRIVING' as AppTravelMode,
      }
      const curried = handleChangeTravelMode(mockParams)
      curried()

      const newState = mockParams.setAppState.mock.calls[0][0]()
      expect(newState).toEqual({ travelMode: 'WALKING' })
    })
  })
})
