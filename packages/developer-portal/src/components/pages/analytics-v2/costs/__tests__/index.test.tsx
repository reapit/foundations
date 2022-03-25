import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AnalyticsCosts } from '../index'

describe('AnalyticsCosts', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsCosts />)).toMatchSnapshot()
  })
})
