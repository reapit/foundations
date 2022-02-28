import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import AppSelect from '../app-select'

describe('AppSelect', () => {
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <AppSelect />
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
