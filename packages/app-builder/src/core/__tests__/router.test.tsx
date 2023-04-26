import * as React from 'react'
import { render } from '@testing-library/react'
import Router from '../router'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router'

describe('Router', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MockedProvider>
          <Router />
        </MockedProvider>
      </MemoryRouter>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
