import * as React from 'react'
import { shallow } from 'enzyme'
import { Toggle, ToggleRadio } from '../index'
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

describe('ToggleRadio', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <ToggleRadio
        name="my-cool-toggle-radio"
        isFullWidth
        options={[
          {
            id: 'option-1',
            value: 'option-1',
            text: 'Option 1',
            isChecked: true,
          },
          {
            id: 'option-2',
            value: 'option-2',
            text: 'Option 2',
            isChecked: false,
          },
          {
            id: 'option-3',
            value: 'option-3',
            text: 'Option 3',
            isChecked: false,
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
