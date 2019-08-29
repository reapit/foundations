import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'

// const FakeRoute = ({ path }: { path: string }) => <div className="render-class" />

const props: PrivateRouteWrapperProps = {
  path: '/',
  isLogin: false,
  setDesktopSession: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    search: '/client/apps?username=wmcvay@reapit.com&desktopToken=TOKEN'
  }
}

// @ts-ignore:
const desktopProps: PrivateRouteWrapperProps = { ...props, isLogin: true, location: { search: '' } }

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PrivateRouteWrapper {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot for desktop login', () => {
    expect(shallow(<PrivateRouteWrapper {...desktopProps} />)).toMatchSnapshot()
  })

  it('should redirect to /login page if isLogin is false and not desktop login', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/my-path']}>
        <PrivateRouteWrapper {...props} />
        <Route path="/login" render={() => <div className="login" />} />
      </MemoryRouter>
    )
    expect(wrapper.find('.login')).toHaveLength(1)
  })

  // TODO: should write a reduxStoreWrapper for testing

  // it('should not redirect to /login page if isLogin is false but is desktop login', () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/my-path']}>
  //       <PrivateRouteWrapper {...props} />
  //       <Route path="/login" render={() => <div className="login" />} />
  //     </MemoryRouter>
  //   )
  //   expect(wrapper.find('.login')).toHaveLength(1)
  // })

  // it('should return render component if isLogin is true', () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/client']}>
  //       <PrivateRouteWrapper isLogin path="/">
  //         <FakeRoute path="/" />
  //       </PrivateRouteWrapper>
  //     </MemoryRouter>
  //   )
  //   expect(wrapper.find('.render-class')).toHaveLength(1)
  // })
})
