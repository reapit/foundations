import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { shallow } from 'enzyme'
import { Appointment, getVendorIds, handleGetVendors, sortAppoinmentsByStartTime } from '../appointment'
import GET_APPOINTMENTS from '../../../../graphql/queries/get-appointments.graphql'
import GET_VENDORS from '../../../../graphql/queries/get-vendors.graphql'
import { appointment } from '@/graphql/__mocks__/appointment'
import { mockAppointmentsQuery } from '../__mocks__/appointments-query'
import { mockVendorsQuery } from '../__mocks__/vendors-query'
import { ExtendedAppointmentModel } from '../../../../types/global'

describe('appointment', () => {
  describe('Apppointment', () => {
    it('should match snapshot with an empty query', () => {
      const wrapper = shallow(
        <MockedProvider mocks={[]} addTypename={false}>
          <Appointment />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot with data', () => {
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
          result: mockAppointmentsQuery,
        },
        {
          request: {
            query: GET_VENDORS,
            variables: {
              id: ['SOME_ID'],
            },
          },
          result: mockVendorsQuery,
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
      const startDatesOfResultSortAppoinmentsByStartTime = result.map((appoinment) => appoinment.start)
      expect(startDatesOfResultSortAppoinmentsByStartTime).toEqual(outputStartDates)
    })
  })

  describe('getVendorIds', () => {
    it('should correctly return vendor ids', () => {
      const appoinments = mockAppointmentsQuery.data.GetAppointments._embedded as ExtendedAppointmentModel[]
      const curried = getVendorIds(appoinments)
      const result = curried()

      expect(result.length).toBe(2)
      expect(result[1]).toEqual('TEST_VENDOR')
    })
  })

  describe('handleGetVendors', () => {
    it('should correctly set state', () => {
      const mockSetState = jest.fn()
      const curried = handleGetVendors(mockVendorsQuery?.data, mockSetState)
      curried()

      const newState = mockSetState.mock.calls[0][0]()

      expect(newState).toEqual({
        vendors: mockVendorsQuery.data.GetVendors._embedded,
      })
    })
  })
})
