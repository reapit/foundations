import React from 'react'
import { shallow } from 'enzyme'
import { appointment } from '@/graphql/__mocks__/appointment'
import { AppointmentTile, renderFooterItems, renderIconItems } from '../appointment-tile'

describe('appointment-list', () => {
  describe('AppointmentTile', () => {
    it('should match snapshot', () => {
      const mockProps = {
        appointment: appointment,
        appointmentTypes: [],
      }
      const wrapper = shallow(<AppointmentTile {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderFooterItems', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<div>{renderFooterItems()}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderIconItems', () => {
    it('should match snapshot', () => {
      const mockParams = {
        appointment: appointment,
        appointmentTypes: [],
      }
      const wrapper = shallow(<div>{renderIconItems(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
