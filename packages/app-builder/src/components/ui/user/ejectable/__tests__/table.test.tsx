import * as React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { Table } from '../table'
import { render } from '../../../../../tests/react-testing'

describe('Table', () => {
  beforeEach(() => {
    window.location.pathname = '/123/456'
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Table />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
