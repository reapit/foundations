import * as React from 'react'
import { PageSelector } from '../PageSelector'
import { MockedProvider } from '@apollo/client/testing'
import { render } from '../../../../tests/react-testing'

describe('PageSelector', () => {
  beforeEach(() => {
    window.location.pathname = '/123/456'
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <PageSelector
          showNewPage
          setShowNewPage={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
