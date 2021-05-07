import React from 'react'
import { shallow } from 'enzyme'
import { appointment } from '@/graphql/__mocks__/appointment'
import { AppointmentTile } from '../appointment-tile'

jest.mock('../../../../core/app-state')

describe('appointment-tile', () => {
  describe('AppointmentTile', () => {
    it('should match snapshot', () => {
      const mockProps = {
        appointment: appointment,
      }
      const wrapper = shallow(<AppointmentTile {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
