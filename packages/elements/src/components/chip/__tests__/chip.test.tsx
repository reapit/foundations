import React from 'react'
import { render } from '@testing-library/react'
import { Chip, ChipGroup } from '..'

describe('Chip component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Chip>Some Content</Chip>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ChipGroup component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <ChipGroup>
        <Chip>Some Content</Chip>
        <Chip>Some Content</Chip>
      </ChipGroup>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
