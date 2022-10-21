import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { render } from '../../../../tests/react-testing'
import {
  Appointment,
  AppointmentContent,
  getLandlordIds,
  getVendorIds,
  handleGetAmlInstallation,
  handleGetLandlords,
  handleGetVendors,
  sortAppoinmentsByStartTime,
} from '../appointment'
import GET_APPOINTMENTS from '../../../../graphql/queries/get-appointments.graphql'
import GET_VENDORS from '../../../../graphql/queries/get-vendors.graphql'
import GET_LANDLORDS from '../../../../graphql/queries/get-landlords.graphql'
import { appointment } from '@/graphql/__mocks__/appointment'
import { mockAppointmentsQuery } from '../__mocks__/appointments-query'
import { mockVendorsQuery } from '../__mocks__/vendors-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { mockLandlordsQuery } from '../__mocks__/landlords-query'

jest.mock('react-google-map')

jest.mock('../../../../core/app-state')

jest.mock('@reapit/utils-common', () => ({
  isIOS: jest.fn(),
  fetcher: jest.fn(() => ({ totalCount: 1 })),
  DATE_TIME_FORMAT: {
    RFC3339: 'yyyy-MM-dd',
  },
  getTime: jest.fn(),
}))

describe('appointment', () => {
  describe('Apppointment', () => {
    it('should match snapshot with an empty query', () => {
      const wrapper = render(
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
        {
          request: {
            query: GET_LANDLORDS,
            variables: {
              id: ['SOME_ID'],
            },
          },
          result: mockLandlordsQuery,
        },
      ]
      const wrapper = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Appointment />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('AppointmentContent', () => {
    it('should match snapshot when loading', () => {
      const wrapper = render(<AppointmentContent loading={true} appointmentsSorted={[]} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when has appointments', () => {
      const wrapper = render(
        <AppointmentContent
          loading={false}
          appointmentsSorted={mockAppointmentsQuery.data.GetAppointments._embedded as ExtendedAppointmentModel[]}
        />,
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

  describe('getLandlordIds', () => {
    it('should correctly return vendor ids', () => {
      const appoinments = mockAppointmentsQuery.data.GetAppointments._embedded as ExtendedAppointmentModel[]
      const curried = getLandlordIds(appoinments)
      const result = curried()

      expect(result.length).toBe(2)
      expect(result[1]).toEqual('TEST_LANDLORD')
    })
  })

  describe('handleGetLandlords', () => {
    it('should correctly set state', () => {
      const mockSetState = jest.fn()
      const curried = handleGetLandlords(mockLandlordsQuery?.data, mockSetState)
      curried()

      const newState = mockSetState.mock.calls[0][0]()

      expect(newState).toEqual({
        landlords: mockVendorsQuery.data.GetVendors._embedded,
      })
    })
  })

  describe('handleGetAmlInstallation', () => {
    it('should correctly set state if there are installations', async () => {
      const mockSetState = jest.fn()
      const curried = handleGetAmlInstallation(mockSetState, 'SOME_TOKEN', 'SOME_CLIENT_ID')
      curried()

      await Promise.resolve()

      const newState = mockSetState.mock.calls[0][0]()

      expect(newState).toEqual({
        hasAmlApp: true,
      })
    })
  })
})
