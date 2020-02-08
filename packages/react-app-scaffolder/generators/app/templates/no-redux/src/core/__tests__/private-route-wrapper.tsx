import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
<<<<<<< HEAD
import { AuthProvider } from '@/context/authContext'

const props: PrivateRouteWrapperProps = {
  path: '/',
=======

const props: PrivateRouteWrapperProps = {
  path: '/',
  hasSession: false,
  setDesktopSession: jest.fn(),
>>>>>>> temp
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    search: '/client/apps?username=wmcvay@reapit.com&desktopToken=TOKEN',
  },
}

// @ts-ignore:
<<<<<<< HEAD
const desktopProps: PrivateRouteWrapperProps = { ...props, location: { search: '' } }

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <AuthProvider>
            <PrivateRouteWrapper {...props} />
          </AuthProvider>,
        ),
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for desktop login', () => {
    expect(
      toJson(
        shallow(
          <AuthProvider>
            <PrivateRouteWrapper {...desktopProps} />
          </AuthProvider>,
        ),
      ),
    ).toMatchSnapshot()
=======
const desktopProps: PrivateRouteWrapperProps = { ...props, hasSession: true, location: { search: '' } }

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<PrivateRouteWrapper {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot for desktop login', () => {
    expect(toJson(shallow(<PrivateRouteWrapper {...desktopProps} />))).toMatchSnapshot()
>>>>>>> temp
  })
})
