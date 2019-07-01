import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter, Route } from 'react-router'
import { PrivateRouteWrapper } from '../private-route-wrapper'

// const FakeRoute = ({ path }: { path: string }) => <div className="render-class" />

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<PrivateRouteWrapper path="/" isLogin={false} />))).toMatchSnapshot()
  })

  it('should redirect to /login page if isLogin is false', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/my-path']}>
        <PrivateRouteWrapper isLogin={false} path="/" />
        <Route path="/login" render={() => <div className="login" />} />
      </MemoryRouter>
    )
    expect(wrapper.find('.login')).toHaveLength(1)
  })

  // TODO: should write a reduxStoreWrapper for testing

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
