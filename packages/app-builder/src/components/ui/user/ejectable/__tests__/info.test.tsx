import * as React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { Info } from '../info'
import { render } from '../../../../../tests/react-testing'

describe('Info', () => {
  beforeEach(() => {
    window.location.pathname = '/123/456'
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Info width={0} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
