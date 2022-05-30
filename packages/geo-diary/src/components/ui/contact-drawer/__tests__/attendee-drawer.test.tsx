import React from 'react'
import { render } from '../../../tests/react-testing'
import { AttendeeDrawer } from '../attendee-drawer'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { useAppState } from '../../../../core/app-state'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')

describe('AttendeeDrawer', () => {
  it('should match snapshot without an appointment in state', () => {
    expect(render(<AttendeeDrawer />)).toMatchSnapshot()
  })

  it('should match snapshot with an appointment in state and an AML App', () => {
    const contacts = appointment?.attendee?.contacts ?? []

    mockedUseAppState.mockImplementation(() => ({
      appState: {
        contactId: contacts[0].id,
        appointment,
        hasAmlApp: true,
      },
      setAppState: jest.fn(),
    }))

    expect(render(<AttendeeDrawer />)).toMatchSnapshot()
  })
})
