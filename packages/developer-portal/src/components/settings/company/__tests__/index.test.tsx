import React from 'react'
import { SettingsCompanyPage } from '..'
import { render, setViewport } from '../../../../tests/react-testing'

describe('SettingsCompanyPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsCompanyPage />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<SettingsCompanyPage />)).toMatchSnapshot()
  })
})
