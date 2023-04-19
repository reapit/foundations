import * as React from 'react'
import { RenderNode } from '../index'
import { MockedProvider } from '@apollo/client/testing'
import { render } from '../../../../tests/react-testing'
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
  beforeEach(() => {
    window.location.pathname = '/123/456'
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <RenderNode render={<></>} iframeRef={{}} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
