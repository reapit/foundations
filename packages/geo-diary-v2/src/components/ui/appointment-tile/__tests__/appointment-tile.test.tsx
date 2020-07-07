import React from 'react'
import { shallow } from 'enzyme'
import { appointment } from '@/graphql/__mocks__/appointment'
import { AppointmentTile, renderFooterItems, renderIconItems } from '../appointment-tile'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

describe('appointment-list', () => {
  describe('AppointmentTile', () => {
    it('should match snapshot', () => {
      const mockProps = {
        appointment: appointment,
      }
      const wrapper = shallow(<AppointmentTile {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderFooterItems', () => {
    it('should match snapshot', () => {
      const mockParams = {
        appointment: appointment,
        queryParams: {},
        history: getMockRouterProps({ params: {}, search: '' }).history,
      }
      const wrapper = shallow(<div>{renderFooterItems(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderIconItems', () => {
    it('should match snapshot', () => {
      const mockParams = {
        appointment: appointment,
      }
      const wrapper = shallow(<div>{renderIconItems(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
