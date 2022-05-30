import React from 'react'
import { render } from '../../../tests/react-testing'
import { LandlordDrawer } from '../landlord-drawer'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { useAppState } from '../../../../core/app-state'
import { mockLandlordsQuery } from '../../../pages/appointment/__mocks__/landlords-query'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')

describe('LandlordDrawer', () => {
  it('should match snapshot without landlords in state', () => {
    expect(render(<LandlordDrawer />)).toMatchSnapshot()
  })

  it('should match snapshot with landlords in state and an AML App', () => {
    const contacts = mockLandlordsQuery.data.GetLandlords._embedded[0].related ?? []
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        landlords: mockLandlordsQuery.data.GetLandlords._embedded,
        contactId: contacts[0].id,
        appointment,
        hasAmlApp: true,
      },
      setAppState: jest.fn(),
    }))

    expect(render(<LandlordDrawer />)).toMatchSnapshot()
  })
})
