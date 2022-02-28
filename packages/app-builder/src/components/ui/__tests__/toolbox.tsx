import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import { Toolbox } from '../toolbox'

describe('Toolbox', () => {
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <Toolbox enabled={false} create={() => {}} />
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
