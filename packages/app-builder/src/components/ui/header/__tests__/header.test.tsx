import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../index'
import { MockedProvider } from '@apollo/client/testing'
import routeData from 'react-router'
import { Editor } from '@craftjs/core'

describe('Header', () => {
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
          <Header isSaving={false} />
        </Editor>
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })

  it('should match a snapshot - saving', () => {
    render(
      <MockedProvider>
        <Editor>
          <Header isSaving={true} />
        </Editor>
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
