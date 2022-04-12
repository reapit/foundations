import React from 'react'
import { AnalyticsPage } from '../index'
import { render } from '../../../../tests/react-testing'

jest.mock('../../state/use-analytics-state')

describe('AnalyticsPage', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AnalyticsPage />)).toMatchSnapshot()
  })
})
