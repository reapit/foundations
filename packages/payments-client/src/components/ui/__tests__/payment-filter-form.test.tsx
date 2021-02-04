import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentsFilterForm from '../payments-filter-form'

describe('PaymentsFilterForm', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <PaymentsFilterForm
        filterValues={{
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
