import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ToolbarRadio } from '../toolbar-radio'

describe('ToolbarRadio', () => {
  it('should match a snapshot', () => {
    render(<ToolbarRadio value={''} name={''} />)
    expect(screen).toMatchSnapshot()
  })
})
