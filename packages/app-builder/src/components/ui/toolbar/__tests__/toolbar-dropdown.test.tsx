import * as React from 'react'
import { render } from '@testing-library/react'
import { ToolbarDropdown } from '../toolbar-dropdown'

describe('ToolbarDropdown', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <ToolbarDropdown
        value={undefined}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
