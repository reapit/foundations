import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { shallow } from 'enzyme'
import { Appointment, sortAppoinmentsByStartTime } from '../appointment'
import GET_APPOINTMENTS from '../get-appointments.graphql'
import { appointment } from '@/graphql/__mocks__/appointment'
import { appointmentsQueryData } from '../__mocks__/appointments-query'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => locationMock),
}))

describe('appointment', () => {
  describe('Apppointment', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
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
      const wrapper = shallow(
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
})
