import React from 'react'
import { render } from '../../../../tests/react-testing'
import { AnalyticsInstallations } from '../index'

jest.mock('../../state/use-analytics-state')

describe('AnalyticsInstallations', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsInstallations />)).toMatchSnapshot()
  })
})
