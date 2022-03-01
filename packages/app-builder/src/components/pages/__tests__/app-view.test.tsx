import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import AppView from '../app-view'

import routeData from 'react-router'

describe('AppView', () => {
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
      <MockedProvider>
        <AppView />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
