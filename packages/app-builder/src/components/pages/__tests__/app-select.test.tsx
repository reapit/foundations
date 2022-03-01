import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import AppSelect from '../app-select'

describe('AppSelect', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <AppSelect />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
