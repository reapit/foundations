import * as React from 'react'
import { render } from '@testing-library/react'
import { RenderNode } from '../index'
import { MockedProvider } from '@apollo/client/testing'

jest.mock('@craftjs/core', () => {
  return {
    useEditor: () => ({}),
    useNode: () => ({
      connectors: {},
      actions: {},
    }),
  }
})

describe('RenderNode', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <RenderNode render={<></>} iframeRef={{}} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
