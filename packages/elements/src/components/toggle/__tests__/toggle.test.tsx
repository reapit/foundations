import React from 'react'
import { render } from '@testing-library/react'
import { Toggle, ToggleRadio } from '../index'
import { ElToggleItem } from '../__styles__/index'

describe('Toggle', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Toggle>
        <ElToggleItem>On</ElToggleItem>
        <ElToggleItem>Off</ElToggleItem>
      </Toggle>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ToggleRadio', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
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
