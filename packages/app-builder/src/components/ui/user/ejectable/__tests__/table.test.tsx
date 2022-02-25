import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'
import { Table } from '../table'

describe('Table', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Table />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
