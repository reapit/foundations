import * as React from 'react'
import { shallow } from 'enzyme'
import { App } from '../app'

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

describe('App', () => {
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
