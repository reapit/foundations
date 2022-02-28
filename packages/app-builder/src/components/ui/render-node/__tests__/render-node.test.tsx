import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { RenderNode } from '../index'
import { MockedProvider } from '@apollo/client/testing'
import { Editor } from '@craftjs/core'

describe('RenderNode', () => {
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <Editor>
          <RenderNode render={<></>} iframeRef={{}} />
        </Editor>
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
