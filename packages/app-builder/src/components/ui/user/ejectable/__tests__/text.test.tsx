import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Text } from '../text'

describe('Text', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Text text={''} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
