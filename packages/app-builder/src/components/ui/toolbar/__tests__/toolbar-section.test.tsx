import * as React from 'react'
import { render } from '@testing-library/react'
import { DisplayToolbarSection } from '../toolbar-section'

describe('ToolbarSection', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <DisplayToolbarSection title={''} summaryText={''}>
        <></>
      </DisplayToolbarSection>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
