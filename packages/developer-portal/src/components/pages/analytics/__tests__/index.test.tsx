import React from 'react'
import { render } from '../../../../tests/react-testing'
import { AnalyticsV2 } from '../index'

describe('AnalyticsV2', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsV2 />)).toMatchSnapshot()
  })
})
