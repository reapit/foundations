import React from 'react'
import { render } from '@testing-library/react'
import { Tabs } from '../index'

describe('Tabs', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Tabs
        name="my-cool-toggle-radio"
        isFullWidth
        isControlled
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
