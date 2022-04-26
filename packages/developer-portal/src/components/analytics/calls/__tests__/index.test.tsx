import React from 'react'
import { render, setViewport } from '../../../../tests/react-testing'
import { AnalyticsCalls } from '../index'

jest.mock('../../state/use-analytics-state')

describe('AnalyticsCalls', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsCalls />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<AnalyticsCalls />)).toMatchSnapshot()
  })
})
