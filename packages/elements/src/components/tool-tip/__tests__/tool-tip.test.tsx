import React from 'react'
import { shallow } from 'enzyme'
import { ToolTip } from '../index'

describe('ToolTip', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(<ToolTip tip={'hello there'}>Hover here</ToolTip>)
    expect(wrapper).toMatchSnapshot()
  })
})
