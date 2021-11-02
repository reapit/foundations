import * as React from 'react'
import { render } from '@testing-library/react'
import AppCard, { handleInstallationsStringEffect, handleNavigation } from '../app-card'
import { history } from '../../../../core/router'
import Routes from '../../../../constants/routes'
import { mockAppDetail } from '../../../../services/__stubs__/apps'

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
    expect(render(<AppCard app={mockAppDetail} />)).toMatchSnapshot()
  })
})

describe('handleNavigation', () => {
  it('should navigate to the app/:id page', () => {
    const historySpy = jest.spyOn(history, 'push')
    const stubAppId = 'SOME_ID'

    const curried = handleNavigation(stubAppId)
    curried()
    expect(historySpy).toHaveBeenCalledWith(`${Routes.MARKETPLACE}/${stubAppId}`)
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
