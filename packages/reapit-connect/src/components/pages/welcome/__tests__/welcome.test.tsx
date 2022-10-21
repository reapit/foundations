import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { Welcome, handleIsShowAgencyCloudSectionMemo } from '../welcome'
import { ReapitConnectHook } from '@reapit/connect-session'

const mockSession = {
  accessToken: '123',
  accessTokenExpiry: 1583492838,
  idToken: '123',
  idTokenExpiry: 1583492838,
  refreshToken: '123',
  cognitoClientId: '123',
  loginType: 'CLIENT',
  userName: 'cbryan@reapit.com',
  mode: 'WEB',
  loginIdentity: {
    name: 'Craig Bryan',
    email: 'cbryan@reapit.com',
    developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
    clientId: 'DXX',
    userCode: 'LJW',
    groups: ['FoundationsDeveloper', 'ReapitUser'],
  },
}

describe('handleIsShowAgencyCloudSectionMemo', () => {
  test('return false when groups empty', () => {
    expect(handleIsShowAgencyCloudSectionMemo(mockSession as unknown as ReapitConnectHook)()).toBeFalsy()
  })
  test('return true when groups include showHandleAgencyCloudSectionGroups group', () => {
    const inputs = [
      { connectSession: { ...mockSession, loginIdentity: { ...mockSession.loginIdentity, groups: ['ReapitUser'] } } },
      {
        connectSession: {
          ...mockSession,
          loginIdentity: { ...mockSession.loginIdentity, groups: ['ReapitUsersAdmin'] },
        },
      },
    ]

    for (const input of inputs) {
      expect(handleIsShowAgencyCloudSectionMemo(input as unknown as ReapitConnectHook)()).toBeTruthy()
    }
  })
})

describe('Welcome', () => {
  it('should match snapshot', () => {
    jest.mock('@reapit/connect-session', () => ({
      connectSession: mockSession,
    }))

    expect(render(<Welcome />)).toMatchSnapshot()
  })

  it('should match snapshot for developer', () => {
    jest.mock('@reapit/connect-session', () => ({
      connectSession: {
        ...mockSession,
        loginIdentity: {
          ...mockSession.loginIdentity,
          clientId: null,
        },
      },
    }))

    expect(render(<Welcome />)).toMatchSnapshot()
  })

  it('should match snapshot for client', () => {
    jest.mock('@reapit/connect-session', () => ({
      connectSession: {
        ...mockSession,
        loginIdentity: {
          ...mockSession.loginIdentity,
          developerId: null,
        },
      },
    }))

    expect(render(<Welcome />)).toMatchSnapshot()
  })
})
