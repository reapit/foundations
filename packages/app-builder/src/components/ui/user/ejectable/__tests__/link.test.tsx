import * as React from 'react'
import { render } from '@testing-library/react'
import { Link } from '../link'
import { MemoryRouter } from 'react-router-dom'

describe('Link', () => {
  beforeEach(() => {
    window.location.pathname = '/123/456'
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Link width={0} />
      </MemoryRouter>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
