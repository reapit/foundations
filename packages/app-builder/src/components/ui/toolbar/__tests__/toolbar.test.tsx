import * as React from 'react'
import { shallow } from 'enzyme'
import { Toolbar } from '../index'

describe('Toolbar', () => {
  it('should match a snapshot - inactive', () => {
    const wrapper = shallow(
      <Toolbar active={false}>
        <></>
      </Toolbar>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot - active', () => {
    const wrapper = shallow(
      <Toolbar active>
        <></>
      </Toolbar>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
