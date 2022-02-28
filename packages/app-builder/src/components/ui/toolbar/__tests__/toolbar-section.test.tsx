import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { DisplayToolbarSection } from '../toolbar-section'

describe('ToolbarSection', () => {
  it('should match a snapshot', () => {
    render(
      <DisplayToolbarSection title={''} summaryText={''}>
        <></>
      </DisplayToolbarSection>,
    )
    expect(screen).toMatchSnapshot()
  })
})
