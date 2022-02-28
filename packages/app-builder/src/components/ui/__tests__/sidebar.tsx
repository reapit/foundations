import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Sidebar from '../sidebar'
import { MockedProvider } from '@apollo/client/testing'
import { Editor } from '@craftjs/core'

describe('Sidebar', () => {
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <Editor>
          <Sidebar />
        </Editor>
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
