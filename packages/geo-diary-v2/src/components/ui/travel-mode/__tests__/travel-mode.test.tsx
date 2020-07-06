import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { TravelMode } from '../travel-mode'

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
})
