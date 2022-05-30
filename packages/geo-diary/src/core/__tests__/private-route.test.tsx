import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { MemoryRouter, Route } from 'react-router'
import { PrivateRoute } from '../private-route'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PrivateRoute allow="CLIENT" loginType="CLIENT" component={() => null} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should redirect to /404 page if isLogin is false', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/my-path']}>
        <PrivateRoute allow="CLIENT" loginType="DEVELOPER" component={() => null} path="/my-path" />
        <Route path="/404" render={() => <div className="not-found" />} />
      </MemoryRouter>,
    )
    expect(wrapper.find('.not-found')).toHaveLength(1)
  })

  it('should return render component if loginType matches allow is true', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/client']}>
        <PrivateRoute
          loginType="CLIENT"
          allow="CLIENT"
          component={() => <div className="render-class" />}
          path="/client"
        />
      </MemoryRouter>,
    )
    expect(wrapper.find('.render-class')).toHaveLength(1)
  })

  it('should return render component if loginType is included in allow array is true', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/developer/my-apps']}>
        <PrivateRoute
          allow={['CLIENT', 'DEVELOPER']}
          loginType="DEVELOPER"
          component={() => <div className="render-class" />}
          path="/developer/my-apps"
        />
      </MemoryRouter>,
    )
    expect(wrapper.find('.render-class')).toHaveLength(1)
  })
})
