import React from 'react'
import { render } from '../../../tests/react-testing'
import { PaymentsFilterControls } from '../payments-filter-controls'

describe('PaymentsFilterControls', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PaymentsFilterControls paymentsFilters={{}} setPaymentsFilters={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
