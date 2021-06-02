import * as React from 'react'
import { shallow } from 'enzyme'
import Router from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Router />)
    expect(wrapper).toMatchSnapshot()
  })
})
