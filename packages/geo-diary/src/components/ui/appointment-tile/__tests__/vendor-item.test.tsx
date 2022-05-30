import React from 'react'
import { render } from '../../../tests/react-testing'
import { VendorItem } from '../vendor-item'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { useAppState } from '../../../../core/app-state'
import { mockVendorsQuery } from '../../../pages/appointment/__mocks__/vendors-query'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')

describe('VendorItem', () => {
  it('should match snapshot without vendors in state', () => {
    expect(render(<VendorItem appointment={appointment} />)).toMatchSnapshot()
  })

  it('should match snapshot with vendors in state', () => {
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        vendors: mockVendorsQuery.data.GetVendors._embedded,
      },
      setAppState: jest.fn(),
    }))

    expect(render(<VendorItem appointment={appointment} />)).toMatchSnapshot()
  })
})
