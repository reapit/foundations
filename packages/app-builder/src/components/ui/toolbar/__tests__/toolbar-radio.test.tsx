import * as React from 'react'
import { render } from '@testing-library/react'
import { ToolbarRadio } from '../toolbar-radio'

describe('ToolbarRadio', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(<ToolbarRadio value={''} name={''} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
