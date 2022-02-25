import * as React from 'react'
import { shallow } from 'enzyme'
import { ToolbarRadio } from '../toolbar-radio'

describe('ToolbarRadio', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<ToolbarRadio value={''} name={''} />)
    expect(wrapper).toMatchSnapshot()
  })
})
