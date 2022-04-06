import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AnalyticsCalculatorTable } from '../results-table'

describe('AnalyticsCalculatorTable', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsCalculatorTable endpointsUsed="tier6" apiCalls="200000" />)).toMatchSnapshot()
  })
})
