import React from 'react'
import { shallow } from 'enzyme'
import { TravelMode, handleChangeTravelMode } from '../travel-mode'

jest.mock('../../../../core/app-state')

describe('travel-mode', () => {
  describe('TravelMode', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<TravelMode />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleChangeTravelMode', () => {
    it('should run correctly', () => {
      const mockParams = {
        setAppState: jest.fn(),
        travelMode: 'DRIVING' as any,
      }
      const fn = handleChangeTravelMode(mockParams)
      fn()
      // expect(mockParams.history.push).toBeCalledWith('/?travelMode=DRIVING')
    })
  })
})
