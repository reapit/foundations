import * as React from 'react'
import { shallow } from 'enzyme'
import { Nav } from '../nav'

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })
})
