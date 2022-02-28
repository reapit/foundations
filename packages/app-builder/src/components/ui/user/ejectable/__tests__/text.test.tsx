import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Text } from '../text'

describe('Text', () => {
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <Text text={''} />
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
