import * as React from 'react'
import { shallow } from 'enzyme'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'

jest.mock('../../reducers/auth')
jest.mock('../../core/store')

// const FakeRoute = ({ path }: { path: string }) => <div className="render-class" />

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
    expect(shallow(<PrivateRouteWrapper {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot for desktop login', () => {
    expect(shallow(<PrivateRouteWrapper {...desktopProps} />)).toMatchSnapshot()
  })
})
