import React from 'react'
import { shallow } from 'enzyme'
import { AppointmentTime, handleChangeTime } from '../appointment-time'
// import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { AppTimeRange } from '../../../../core/app-state'

describe('appointment-time', () => {
  describe('AppointmentTime', () => {
    it('should match snapshot', () => {
      // const mockProps = {
      //   queryParams: {},
      //   history: getMockRouterProps({ params: {}, search: '' }).history,
      // }
      const wrapper = shallow(<AppointmentTime /*{...mockProps}*/ />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleChangeTime', () => {
    it('should run correctly', () => {
      const mockParams = {
        setAppState: jest.fn(),
        time: 'today' as AppTimeRange,
      }
      const fn = handleChangeTime(mockParams)
      fn()
      // expect(mockParams.history.push).toBeCalledWith('/?time=today')
    })
  })
})
