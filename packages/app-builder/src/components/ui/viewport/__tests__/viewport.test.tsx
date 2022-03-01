import * as React from 'react'
import { render, screen } from '@testing-library/react'
import routeData from 'react-router'
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
  })
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <Editor>
          <Viewport isSaving={false} iframeRef={undefined} deserialize={() => {}} rendererDivRefHandler={() => {}}>
            <></>
          </Viewport>
        </Editor>
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })

  it('should match a snapshot - saving', () => {
    render(
      <MockedProvider>
        <Editor>
          <Viewport isSaving iframeRef={undefined} deserialize={() => {}} rendererDivRefHandler={() => {}}>
            <></>
          </Viewport>
        </Editor>
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
