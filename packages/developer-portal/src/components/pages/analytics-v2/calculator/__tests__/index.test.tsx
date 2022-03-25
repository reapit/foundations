import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AnalyticsCalculator } from '../index'

describe('AnalyticsCalculator', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsCalculator />)).toMatchSnapshot()
  })
})
