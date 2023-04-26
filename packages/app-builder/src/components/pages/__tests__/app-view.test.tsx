import * as React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import AppView from '../app-view'
import { render } from '../../../tests/react-testing'

describe('AppView', () => {
  beforeEach(() => {
    window.location.pathname = '/123/456'
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <AppView />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
