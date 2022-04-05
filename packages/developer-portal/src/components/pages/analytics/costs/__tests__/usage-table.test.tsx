import { render } from '@testing-library/react'
import React from 'react'
import { UsageTable } from '../usage-table'
import { mockMonthlyBillingData } from '../../../../../tests/__stubs__/billing'

describe('UsageTable', () => {
  it('should match a snapshot with billing', () => {
    expect(render(<UsageTable billing={mockMonthlyBillingData} />)).toMatchSnapshot()
  })
})
