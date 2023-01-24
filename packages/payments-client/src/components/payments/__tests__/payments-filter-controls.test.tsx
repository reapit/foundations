import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleFormChange, PaymentsFilterControls } from '../payments-filter-controls'

describe('PaymentsFilterControls', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PaymentsFilterControls paymentsFilters={{}} setPaymentsFilters={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleFormChange', () => {
  it('should correctly handle form change', () => {
    const setPaymentsFilters = jest.fn()

    const curried = handleFormChange(setPaymentsFilters)

    curried({})

    expect(setPaymentsFilters).toHaveBeenCalledWith({})
  })
})
