import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'

const props: PrivateRouteWrapperProps = {
  path: '/',
  hasSession: false,
  setDesktopSession: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    search: '/client/apps?username=wmcvay@reapit.com&desktopToken=TOKEN',
  },
}

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<PrivateRouteWrapper {...props} />))).toMatchSnapshot()
  })
})
