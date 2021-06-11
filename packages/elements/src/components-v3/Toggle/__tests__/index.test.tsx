import * as React from 'react'
import { shallow } from 'enzyme'
import { Toggle } from '../index'
import { elToggleItem } from '../__styles__/index'

describe('Toggle', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <Toggle>
        <span className={elToggleItem}>On</span>
        <span className={elToggleItem}>Off</span>
      </Toggle>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
