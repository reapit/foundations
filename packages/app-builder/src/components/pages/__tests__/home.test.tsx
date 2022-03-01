import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import routeData from 'react-router'

import Home from '../home'
import { Editor } from '@craftjs/core'
import '../../ui/viewport/inject-frame-styles'

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
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <Editor>
        <MockedProvider>
          <Home />
        </MockedProvider>
      </Editor>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
