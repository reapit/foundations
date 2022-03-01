import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import { Toolbox } from '../toolbox'

describe('Toolbox', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Toolbox enabled={false} create={() => {}} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
