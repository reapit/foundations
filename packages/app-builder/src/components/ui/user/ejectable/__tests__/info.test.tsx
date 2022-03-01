import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import routeData from 'react-router'
import { Info } from '../info'

describe('Info', () => {
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
        <Info width={0} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
