import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router'

import Home from '../home'
import { Editor } from '@craftjs/core'
import '../../ui/viewport/inject-frame-styles'

jest.mock('../../ui/viewport/inject-frame-styles', () => {
  const InjectFrameStyles = ({ children }) => children

  return {
    InjectFrameStyles,
  }
})

jest.mock('react-frame-component', () => {
  const IFrame = ({ children }) => children
  return {
    default: IFrame,
    __esModule: true,
  }
})

describe('Home', () => {
  beforeEach(() => {
    window.location.pathname = '/123/456'

    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })
  //  Skipping as the editor has some css that changes at every render so the snapshot always fails
  xit('should match a snapshot', () => {
    const { asFragment } = render(
      <Editor>
        <MemoryRouter>
          <MockedProvider>
            <Home />
          </MockedProvider>
        </MemoryRouter>
      </Editor>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
