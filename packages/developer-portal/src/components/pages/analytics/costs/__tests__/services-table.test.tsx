import { render } from '@testing-library/react'
import React from 'react'
import { mockMonthlyBillingData } from '../../../../../tests/__stubs__/billing'
import { ServicesTable } from '../services-table'

describe('ServicesTable', () => {
  it('should match a snapshot with billing', () => {
    expect(render(<ServicesTable billing={mockMonthlyBillingData} />)).toMatchSnapshot()
  })
})
