import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PrivateRouteWrapper, PrivateRouteWrapperProps, mapDispatchToProps } from '../private-route-wrapper'

const props: PrivateRouteWrapperProps = {
  path: '/',
  hasSession: false,
  setDesktopSession: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    search: '/client/apps?username=wmcvay@reapit.com&desktopToken=TOKEN',
  },
}

// @ts-ignore:
const desktopProps: PrivateRouteWrapperProps = { ...props, hasSession: true, location: { search: '' } }

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<PrivateRouteWrapper {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot for desktop login', () => {
    expect(toJson(shallow(<PrivateRouteWrapper {...desktopProps} />))).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const fn = mapDispatchToProps(mockDispatch)
      fn.setRefreshSession({
        cognitoClientId: '123',
        loginType: 'CLIENT',
        mode: 'DESKTOP',
        redirectUri: 'https://localhost:8080',
        authorizationCode: '123',
        refreshToken: '123',
        userName: 'tanphamhaiduong@gmail.com',
        state: '123',
      })
      expect(mockDispatch).toBeCalled()
    })
  })
})
