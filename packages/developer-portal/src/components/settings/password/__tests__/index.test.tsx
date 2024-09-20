import React from 'react'
import { SettingsPasswordPage } from '..'
import { render, setViewport } from '../../../../tests/react-testing'
import { tokenFromCognito } from '../../../../utils/token'

jest.mock('../../../../utils/token', () => ({
  tokenFromCognito: jest.fn(),
}))

const mockTokenUtil = tokenFromCognito as jest.Mock

describe('SettingsPasswordPage', () => {
  beforeEach(() => {
    process.env.appEnv = 'local'
  })

  mockTokenUtil.mockReturnValue(true)

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
