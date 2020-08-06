import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router'
import { PrivateRoute } from '../private-route'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<PrivateRoute loginType="CLIENT" component={() => null} />))).toMatchSnapshot()
  })

  it('should return render component if loginType matches allow is true', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/client']}>
        <PrivateRoute loginType="CLIENT" component={() => <div className="render-class" />} path="/client" />
      </MemoryRouter>,
    )
    expect(wrapper.find('.render-class')).toHaveLength(1)
  })

  it('should return render component if loginType is included in allow array is true', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/developer/my-apps']}>
        <PrivateRoute
          loginType="DEVELOPER"
          component={() => <div className="render-class" />}
          path="/developer/my-apps"
        />
      </MemoryRouter>,
    )
    expect(wrapper.find('.render-class')).toHaveLength(1)
  })
})
