import React from 'react'
import { render } from '../../../tests/react-testing'
import { LandlordItem } from '../landlord-item'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { useAppState } from '../../../../core/app-state'
import { mockLandlordsQuery } from '../../../pages/appointment/__mocks__/landlords-query'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')

describe('LandlordItem', () => {
  it('should match snapshot without landlords in state', () => {
    expect(render(<LandlordItem appointment={appointment} />)).toMatchSnapshot()
  })

  it('should match snapshot with landlords in state', () => {
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        landlords: mockLandlordsQuery.data.GetLandlords._embedded,
      },
      setAppState: jest.fn(),
    }))

    expect(render(<LandlordItem appointment={appointment} />)).toMatchSnapshot()
  })
})
