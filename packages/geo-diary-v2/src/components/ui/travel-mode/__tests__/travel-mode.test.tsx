import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { TravelMode, handleChangeTravelMode } from '../travel-mode'

describe('travel-mode', () => {
  describe('TravelMode', () => {
    it('should match snapshot', () => {
      const mockProps = {
        queryParams: {},
        history: getMockRouterProps({ params: {}, search: '' }).history,
      }
      const wrapper = shallow(<TravelMode {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleChangeTravelMode', () => {
    it('should run correctly', () => {
      const mockParams = {
        queryParams: {},
        travelMode: 'DRIVING',
        history: getMockRouterProps({ params: {}, search: '' }).history,
      }
      const fn = handleChangeTravelMode(mockParams)
      fn()
      expect(mockParams.history.push).toBeCalledWith('/?travelMode=DRIVING')
    })
  })
})
