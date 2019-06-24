import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter, Route } from 'react-router'
import { PrivateRoute } from '../private-route'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<PrivateRoute component={() => null} isLogin={false} />))).toMatchSnapshot()
  })

  it('should redirect to /login page if isLogin is false', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/my-path']}>
        <PrivateRoute isLogin={false} component={() => null} path="/my-path" />
        <Route path="/login" render={() => <div className="login" />} />
      </MemoryRouter>
    )
    expect(wrapper.find('.login')).toHaveLength(1)
  })

  it('should return render component if isLogin is true', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/client']}>
        <PrivateRoute isLogin component={() => <div className="render-class" />} path="/client" />
      </MemoryRouter>
    )
    expect(wrapper.find('.render-class')).toHaveLength(1)
  })
})
