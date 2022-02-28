import * as React from 'react'
import { render, screen } from '@testing-library/react'
import routeData from 'react-router'
import { Link } from '../link'
import { MemoryRouter } from 'react-router-dom'

describe('Link', () => {
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
      <MemoryRouter>
        <Link width={0} />
      </MemoryRouter>,
    )
    expect(screen).toMatchSnapshot()
  })
})
