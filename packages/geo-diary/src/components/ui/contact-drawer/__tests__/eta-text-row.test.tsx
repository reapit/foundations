import React from 'react'
import { shallow } from 'enzyme'
import EtaTextRow from '../eta-text-row'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { useAppState } from '../../../../core/app-state'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')
jest.mock('@reapit/connect-session', () => ({
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        userCode: 'LJW',
        orgName: 'ACME',
      },
    },
  })),
  ReapitConnectBrowserSession: jest.fn(),
}))

describe('EtaTextRow', () => {
  it('should match snapshot without phone number and default state', () => {
    expect(shallow(<EtaTextRow name="Bob" />)).toMatchSnapshot()
  })

  it('should match snapshot with a phone number and populated state', () => {
    mockedUseAppState.mockImplementation(() => ({
      appState: {
        appointment,
        routeInformation: {
          duration: { text: '1hr 20mins' },
        },
      },
      setAppState: jest.fn(),
    }))

    expect(shallow(<EtaTextRow phoneNumber="0777777777" name="Bob" />)).toMatchSnapshot()
  })
})
