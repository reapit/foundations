import * as React from 'react'
import { shallow } from 'enzyme'
import { MultiSelectChip, MultiSelect } from '../index'

describe('MultiSelectChip', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <MultiSelectChip>
        <span>Some Value</span>
      </MultiSelectChip>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MultiSelect', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <MultiSelect>
        <span>Some Value</span>
      </MultiSelect>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
