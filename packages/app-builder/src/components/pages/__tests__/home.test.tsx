import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import routeData, { MemoryRouter } from 'react-router'

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
