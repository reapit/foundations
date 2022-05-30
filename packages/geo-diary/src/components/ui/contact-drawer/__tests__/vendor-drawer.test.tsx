import React from 'react'
import { render } from '../../../tests/react-testing'
import { VendorDrawer } from '../vendor-drawer'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { useAppState } from '../../../../core/app-state'
import { mockVendorsQuery } from '../../../pages/appointment/__mocks__/vendors-query'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')

describe('VendorDrawer', () => {
  it('should match snapshot without vendors in state', () => {
    expect(render(<VendorDrawer />)).toMatchSnapshot()
  })

  it('should match snapshot with vendors in state and an AML app', () => {
    const contacts = mockVendorsQuery.data.GetVendors._embedded[0].related ?? []
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        vendors: mockVendorsQuery.data.GetVendors._embedded,
        contactId: contacts[0].id,
        appointment,
        hasAmlApp: true,
      },
      setAppState: jest.fn(),
    }))

    expect(render(<VendorDrawer />)).toMatchSnapshot()
  })
})
