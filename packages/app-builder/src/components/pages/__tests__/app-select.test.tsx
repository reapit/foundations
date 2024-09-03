import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import AppSelect from '../app-select'
import { MemoryRouter } from 'react-router'
import { webcrypto } from 'crypto'

Object.defineProperties(global, {
  crypto: { value: webcrypto, writable: true },
})

describe('AppSelect', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <MemoryRouter>
          <AppSelect />
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
