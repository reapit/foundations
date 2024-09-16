import React from 'react'
import { SettingsPasswordPage } from '..'
import { render, setViewport } from '../../../../tests/react-testing'

describe('SettingsPasswordPage', () => {
  beforeEach(() => {
    process.env.appEnv = 'local'
  })

  it('should match snapshot', () => {
    expect(render(<SettingsPasswordPage />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<SettingsPasswordPage />)).toMatchSnapshot()
  })
})
