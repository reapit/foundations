import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AnalyticsCalls } from '../index'

jest.mock('../../state/use-analytics-state')

describe('AnalyticsCalls', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsCalls />)).toMatchSnapshot()
  })
})
