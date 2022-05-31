import * as React from 'react'
import { render } from '../../../tests/react-testing'
import PaymentsFilterForm from '../payments-filter-form'

describe('PaymentsFilterForm', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <PaymentsFilterForm
        filterValues={{
          pageSize: '12',
          createdFrom: 'createdFrom',
          createdTo: 'createdTo',
          properties: 'properties',
          description: 'description',
          type: ['type1', 'type2'],
          status: ['status'],
        }}
        onSearch={jest.fn()}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
