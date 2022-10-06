import * as React from 'react'
import { render } from '@testing-library/react'
import { PageSelector } from '../PageSelector'
import { MockedProvider } from '@apollo/client/testing'
import routeData from 'react-router'

describe('PageSelector', () => {
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
        <PageSelector
          showNewPage
          setShowNewPage={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
