import React from 'react'
import { shallow } from 'enzyme'
import { AppointmentTime, handleChangeTravelMode } from '../appointment-time'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

describe('appointment-time', () => {
  describe('AppointmentTime', () => {
    it('should match snapshot', () => {
      const mockProps = {
        queryParams: {},
        history: getMockRouterProps({ params: {}, search: '' }).history,
      }
      const wrapper = shallow(<AppointmentTime {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleChangeTravelMode', () => {
    it('should run correctly', () => {
      const mockParams = {
        history: getMockRouterProps({ params: {}, search: '' }).history,
        queryParams: {},
        time: 'today' as 'today',
      }
      const fn = handleChangeTravelMode(mockParams)
      fn()
      expect(mockParams.history.push).toBeCalledWith('/?time=today')
    })
  })
})
