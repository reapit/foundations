import * as React from 'react'
import { shallow } from 'enzyme'
import { Welcome, handleIsShowAgencyCloudSectionMemo } from '../welcome'
import { ReapitConnectHook } from '@reapit/connect-session'

const session = {
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
  },
}

describe('handleIsShowAgencyCloudSectionMemo', () => {
  test('return false when groups empty', () => {
    expect(handleIsShowAgencyCloudSectionMemo((session as unknown) as ReapitConnectHook)()).toBeFalsy()
  })
  test('return true when groups include showHandleAgencyCloudSectionGroups group', () => {
    const inputs = [
      { connectSession: { ...session, loginIdentity: { ...session.loginIdentity, groups: ['ReapitUser'] } } },
      { connectSession: { ...session, loginIdentity: { ...session.loginIdentity, groups: ['ReapitUsersAdmin'] } } },
    ]

    for (const input of inputs) {
      expect(handleIsShowAgencyCloudSectionMemo((input as unknown) as ReapitConnectHook)()).toBeTruthy()
    }
  })
})

describe('Welcome', () => {
  it('should match snapshot', () => {
    jest.mock('@reapit/connect-session', () => ({
      connectSession: session,
    }))

    expect(shallow(<Welcome />)).toMatchSnapshot()
  })

  it('should match snapshot for developer', () => {
    jest.mock('@reapit/connect-session', () => ({
      connectSession: {
        ...session,
        loginIdentity: {
          ...session.loginIdentity,
          clientId: null,
        },
      },
    }))

    expect(shallow(<Welcome />)).toMatchSnapshot()
  })

  it('should match snapshot for client', () => {
    jest.mock('@reapit/connect-session', () => ({
      connectSession: {
        ...session,
        loginIdentity: {
          ...session.loginIdentity,
          developerId: null,
        },
      },
    }))

    expect(shallow(<Welcome />)).toMatchSnapshot()
  })
})
