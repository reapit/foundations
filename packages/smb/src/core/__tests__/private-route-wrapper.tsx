import React from 'react'
import { shallow } from 'enzyme'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'

const session = {
  accessToken: '123',
  accessTokenExpiry: 1583492838,
  idToken: '123',
  idTokenExpiry: 1583492838,
  refreshToken: '123',
  cognitoClientId: 'ue1e0vujti1p9f133ckfkbkdh',
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

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
  getSessionCookie: jest.fn(),
  getTokenFromQueryString: jest.fn(),
  redirectToOAuth: jest.fn(),
  getSession: jest.fn(() => session),
}))

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    const props: PrivateRouteWrapperProps = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const wrapper = shallow(<PrivateRouteWrapper {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot', () => {
    const props = {} as any
    const wrapper = shallow(<PrivateRouteWrapper {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
