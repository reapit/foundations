import * as React from 'react'
import { shallow } from 'enzyme'
import { Select } from '../'

describe('Select component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Select />)
    expect(wrapper).toMatchSnapshot()
  })
})
