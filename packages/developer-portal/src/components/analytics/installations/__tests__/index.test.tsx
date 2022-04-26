import React from 'react'
import { render, setViewport } from '../../../../tests/react-testing'
import { AnalyticsInstallations } from '../index'

jest.mock('../../state/use-analytics-state')

describe('AnalyticsInstallations', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsInstallations />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<AnalyticsInstallations />)).toMatchSnapshot()
  })
})
