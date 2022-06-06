import React from 'react'
import { render } from '../../../../tests/react-testing'
import { KeyInfo, PropertyDrawer, KeyModel } from '../property-drawer'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { useAppState } from '../../../../core/app-state'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')

describe('PropertyDrawer', () => {
  it('should match snapshot without an appointment in state', () => {
    expect(render(<PropertyDrawer />)).toMatchSnapshot()
  })

  it('should match snapshot with an appointment in state', () => {
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        appointment,
      },
      setAppState: jest.fn(),
    }))

    expect(render(<PropertyDrawer />)).toMatchSnapshot()
  })
})

describe('KeyInfo', () => {
  it('should match snapshot with an appointment in state', () => {
    expect(render(<KeyInfo keyModel={(appointment.property?.keys as KeyModel[])[0]} />)).toMatchSnapshot()
  })
})
