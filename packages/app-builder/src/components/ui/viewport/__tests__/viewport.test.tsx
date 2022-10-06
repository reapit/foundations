import * as React from 'react'
import { render } from '@testing-library/react'
import routeData, { MemoryRouter } from 'react-router'
import { MockedProvider } from '@apollo/client/testing'
import { Viewport } from '../index'
import { Editor } from '@craftjs/core'

import '../inject-frame-styles'

jest.mock('../inject-frame-styles', () => {
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

// mock react-tooltip's uuid generation to have consistent class names in the snapshots https://github.com/wwayne/react-tooltip/issues/595#issuecomment-730875047
jest.mock(
  (() => {
    // This will mock the version of uuid belonging to react-tooltip
    // if it exists, otherwise use the top-level uuid module
    try {
      require('react-tooltip/node_modules/uuid')
      return 'react-tooltip/node_modules/uuid'
    } catch (error) {
      return 'uuid'
    }
  })(),
  () => ({
    v4: () => '00000000-0000-0000-0000-000000000000',
  }),
)

describe('Viewport', () => {
  const mockParams = {
    appId: '123',
    pageId: '456',
  }
  const mockLocation = {
    pathname: '/123/456',
    hash: '',
    search: '',
    state: '',
  }
  beforeEach(() => {
    jest.spyOn(routeData, 'useParams').mockReturnValue(mockParams)
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)

    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <MemoryRouter>
          <Editor>
            <Viewport iframeRef={undefined} deserialize={() => {}} rendererDivRefHandler={() => {}}>
              <></>
            </Viewport>
          </Editor>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
