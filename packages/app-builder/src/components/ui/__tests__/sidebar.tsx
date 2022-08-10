import * as React from 'react'
import { render } from '@testing-library/react'
import Sidebar from '../sidebar'
import { MockedProvider } from '@apollo/client/testing'
import { Editor } from '@craftjs/core'

describe('Sidebar', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Editor>
          <Sidebar isCollapsed={false} />
        </Editor>
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
