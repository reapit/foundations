import React from 'react'
import { render } from '@testing-library/react'
import { ToolTip } from '../index'

describe('ToolTip', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(<ToolTip tip={'hello there'}>Hover here</ToolTip>)
    expect(wrapper).toMatchSnapshot()
  })
})
