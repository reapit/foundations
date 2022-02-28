import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ToolbarDropdown } from '../toolbar-dropdown'

describe('ToolbarDropdown', () => {
  it('should match a snapshot', () => {
    render(
      <ToolbarDropdown
        title={''}
        value={undefined}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen).toMatchSnapshot()
  })
})
