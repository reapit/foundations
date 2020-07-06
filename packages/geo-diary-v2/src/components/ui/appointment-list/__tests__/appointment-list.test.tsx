import React from 'react'
import { shallow } from 'enzyme'
import { appointments } from '@/graphql/__mocks__/appointments'
import { AppointmentList } from '../appointment-list'

describe('appointment-list', () => {
  describe('AppointmentList', () => {
    it('should match snapshot', () => {
      const mockProps = {
        appointments: appointments._embedded,
      }
      const wrapper = shallow(<AppointmentList {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
