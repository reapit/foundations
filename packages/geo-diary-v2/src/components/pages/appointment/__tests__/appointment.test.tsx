import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { mount } from 'enzyme'
import { Appointment, handleUseEffect, sortAppoinmentsByStartTime } from '../appointment'
import GET_APPOINTMENTS from '../get-appointments.graphql'
import { appointment } from '@/graphql/__mocks__/appointment'
import { appointmentsQueryData } from '../__mocks__/appointments-query'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => locationMock),
}))

describe('appointment', () => {
  describe('Apppointment', () => {
    it('should match snapshot', () => {
      const wrapper = mount(
        <MockedProvider mocks={[]} addTypename={false}>
          <Appointment />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mocks = [
        {
          request: {
            query: GET_APPOINTMENTS,
            variables: {
              negotiatorId: ['LJW'],
              start: appointment.start,
              end: appointment.end,
              includeCancelled: true,
              includeConfirm: true,
            },
          },
          result: appointmentsQueryData,
        },
      ]
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Appointment />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('sortAppoinmentsByStartTime', () => {
    it('sort appoinments correctly', () => {
      const inputs = [appointment]
      const outputStartDates = ['2019-05-11T17:30:00']
      const fn = sortAppoinmentsByStartTime(inputs)
      const result = fn()
      const startDatesOfResultSortAppoinmentsByStartTime = result.map(appoinment => appoinment.start)
      expect(startDatesOfResultSortAppoinmentsByStartTime).toEqual(outputStartDates)
    })
  })
  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const mockProps = {
        queryParams: {},
        history: getMockRouterProps({ params: '', search: '' }).history,
      }
      const fn = handleUseEffect(mockProps)
      fn()
      expect(mockProps.history.push).not.toBeCalled()
    })
  })
})
