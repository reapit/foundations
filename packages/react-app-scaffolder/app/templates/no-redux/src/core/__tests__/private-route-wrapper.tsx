import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { AuthProvider } from '@/context/auth-context'

const props: PrivateRouteWrapperProps = {
  path: '/',
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    search: '/client/apps?username=wmcvay@reapit.com&desktopToken=TOKEN',
  },
}


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
})
