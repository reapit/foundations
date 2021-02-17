import * as React from 'react'
import { mount } from 'enzyme'
import AppCard, { handleInstallationsStringEffect, handleNavigation } from '../app-card'
import { history } from '../../../../core/router'
import Routes from '../../../../constants/routes'

describe('AppCard', () => {
  it('should match a snapshot', () => {
    const stubApp = { name: 'APP_NAME', developer: 'APP_DEVELOPER' }
    expect(mount(<AppCard app={stubApp} />)).toMatchSnapshot()
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
    const mockInstalls = {
      data: [
        {
          client: 'SBOX',
        },
      ],
    }
    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Installed for organisation SBOX')
  })

  it('should return an installed for single group string', () => {
    const mockSetString = jest.fn()
    const clientId = 'SBOX'
    const mockInstalls = {
      data: [
        {
          client: 'SBOX-GWIT',
        },
      ],
    }
    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Installed for 1 office group')
  })

  it('should return an installed for single group string', () => {
    const mockSetString = jest.fn()
    const clientId = 'SBOX'
    const mockInstalls = {
      data: [
        {
          client: 'SBOX-GWIT',
        },
        {
          client: 'SBOX-ABCT',
        },
      ],
    }
    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Installed for 2 office groups')
  })

  it('should return a not installed string', () => {
    const mockSetString = jest.fn()
    const clientId = 'SBOX'
    const mockInstalls = {
      data: [],
    }
    const curried = handleInstallationsStringEffect(mockSetString, mockInstalls, clientId)
    curried()
    expect(mockSetString).toHaveBeenCalledWith('Not installed')
  })
})
