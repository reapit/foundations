import * as React from 'react'
import { shallow } from 'enzyme'
import { App, isUserWithDevIdOnly } from '../app'
import { LoginIdentity, useReapitConnect } from '@reapit/connect-session'
import { DEVELOPER_PORTAL_APPS } from '@/constants/routes'

const mockedUseReapitConnect = (useReapitConnect as unknown) as jest.Mock

jest.mock('@reapit/connect-session')

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
    adminId: '1',
    userCode: 'LJW',
  },
}

const loginIdentitiyWithDeveloperIdOnly = ({ developerId: '1' } as unknown) as LoginIdentity

describe('isUserWithDevIdOnly', () => {
  test('user with developer id only', () => {
    expect(isUserWithDevIdOnly(loginIdentitiyWithDeveloperIdOnly)).toBeTruthy()
  })
  test('user with developer id, client id, admin id', () => {
    expect(isUserWithDevIdOnly(session.loginIdentity as LoginIdentity)).toBeFalsy()
  })
  test('user with clientId = SBOX', () => {
    expect(isUserWithDevIdOnly(session.loginIdentity as LoginIdentity)).toBeFalsy()
  })
})

describe('App', () => {
  test('redirect to https://dev.developers.reapit.cloud/apps when isUserWithDevIdOnly is true', () => {
    window.location.href = ''
    mockedUseReapitConnect.mockReturnValueOnce({
      connectSession: { ...session, loginIdentity: loginIdentitiyWithDeveloperIdOnly },
    })
    shallow(<App />)
    expect(location.href).toBe(DEVELOPER_PORTAL_APPS)
  })

  test('redirect to https://dev.developers.reapit.cloud/apps when isUserWithDevIdOnly is false', () => {
    window.location.href = ''
    mockedUseReapitConnect.mockReturnValue({
      connectSession: session,
    })
    shallow(<App />)
    expect(location.href).toBe('')
  })

  it('should match snapshot', () => {
    jest.mock('@reapit/connect-session', () => ({
      connectSession: session,
    }))

    expect(shallow(<App />)).toMatchSnapshot()
  })

  it('should match snapshot when session is empty', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  })
})
