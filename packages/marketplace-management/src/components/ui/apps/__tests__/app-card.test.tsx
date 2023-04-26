import * as React from 'react'
import AppCard, { handleInstallationsStringEffect } from '../app-card'
import { mockAppDetail } from '../../../../services/__stubs__/apps'
import { mockBrowserSession } from '../../../../services/__mocks__/session'
import { render } from '../../../../tests/react-testing'

jest.mock('../../../../utils/use-org-id', () => ({
  useOrgId: () => ({
    orgIdState: {
      orgId: 'SOME_ID',
      orgName: 'SOME_NAME',
      orgClientId: 'SOME_CLIENT_ID',
    },
  }),
}))

describe('AppCard', () => {
  it('should match a snapshot', () => {
    expect(render(<AppCard app={mockAppDetail} connectSession={mockBrowserSession} />)).toMatchSnapshot()
  })
})

describe('handleInstallationsStringEffect', () => {
  it('should return an installed for org string', () => {
    const mockSetString = jest.fn()
    const clientId = 'SBOX'
    const email = 'test@test.com'
    const mockInstalls = [
      {
        client: 'SBOX',
      },
    ]

    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, email, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Installed for organisation SBOX')
  })

  it('should return an installed for single group string', () => {
    const mockSetString = jest.fn()
    const clientId = 'SBOX'
    const email = 'test@test.com'
    const mockInstalls = [
      {
        client: 'SBOX-GWIT',
      },
    ]
    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, email, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Installed for 1 office group')
  })

  it('should return an installed for single group string', () => {
    const mockSetString = jest.fn()
    const clientId = 'SBOX'
    const email = 'test@test.com'
    const mockInstalls = [
      {
        client: 'SBOX-GWIT',
      },
      {
        client: 'SBOX-ABCT',
      },
    ]
    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, email, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Installed for 2 office groups')
  })

  it('should return a not installed string', () => {
    const mockSetString = jest.fn()
    const clientId = 'SBOX'
    const email = 'test@test.com'
    const mockInstalls = []
    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, email, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Not installed')
  })
})
