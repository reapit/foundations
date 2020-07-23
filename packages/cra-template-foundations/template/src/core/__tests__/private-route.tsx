import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { PrivateRoute } from '../private-route'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PrivateRoute component={() => null} />)).toMatchSnapshot()
  })

  it('should return render component', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/client']}>
        <PrivateRoute component={() => <div className="render-class" />} />
      </MemoryRouter>,
    )
    expect(wrapper.find('.render-class')).toHaveLength(1)
  })
})
