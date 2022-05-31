import React from 'react'
import { render } from '../../../../tests/react-testing'
import EtaTextRow, { getNegotiator } from '../eta-text-row'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { defaultAppState, useAppState } from '../../../../core/app-state'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { handleGenerateUserText } from '../eta-text-row'
import { ReapitConnectSession } from '@reapit/connect-session'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel
const mockedUseAppState = useAppState as jest.Mock

jest.mock('../../../../core/app-state')
jest.mock('../../../../utils/map-utils')
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
    expect(render(<EtaTextRow name="Bob" />)).toMatchSnapshot()
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

    expect(render(<EtaTextRow phoneNumber="0777777777" name="Bob" />)).toMatchSnapshot()
  })
})

describe('getNegotiator', () => {
  expect(getNegotiator({ appointment, userCode: 'LJW' })).toEqual((appointment?.negotiators as NegotiatorModel[])[0])
})

describe('handleGenerateUserText', () => {
  it('should handle a generated text', async () => {
    const result = 'sms:0777777777?&body=Hi Negotiator, this is Liam Jowett from Reapit, I will be with you shortly.'
    const appState = {
      ...defaultAppState,
      appointment,
    }

    const session = {
      loginIdentity: {
        userCode: 'LJW',
        orgName: 'Reapit',
      },
    } as ReapitConnectSession

    const curried = handleGenerateUserText(appState, session, 'DRIVING', 'Negotiator', '0777777777')

    await curried()
    expect(window.location.href).toEqual(result)
  })
})
