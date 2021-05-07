import React from 'react'
import { shallow } from 'enzyme'
import { AppointmentTime, handleChangeTime } from '../appointment-time'
import { AppTimeRange } from '../../../../core/app-state'

jest.mock('../../../../core/app-state')

describe('appointment-time', () => {
  describe('AppointmentTime', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<AppointmentTime />)
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
    })
  })
})
