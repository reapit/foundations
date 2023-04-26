import React from 'react'
import AppInstallations, { handleSetInstallationId, handleUninstallApp, handleUninstallSuccess } from '..'
import { render, setViewport } from '../../../../tests/react-testing'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockInstallationModelPagedResult } from '../../../../tests/__stubs__/installations'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppInstallations', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValueOnce([{ ...mockInstallationModelPagedResult }])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })

  it('should match a snapshot when no installations', () => {
    mockUseReapitGet.mockReturnValueOnce([{ totalCount: 0 }, false])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })

  it('should match a snapshot when no response', () => {
    mockUseReapitGet.mockReturnValueOnce([null, false])

    expect(render(<AppInstallations />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    mockUseReapitGet.mockReturnValueOnce([{ ...mockInstallationModelPagedResult }])
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<AppInstallations />)).toMatchSnapshot()
  })
})

describe('handleUninstallApp', () => {
  it('should handle uninstallation', () => {
    const email = 'mock@mail.com'
    const uninstallApp = jest.fn()
    const setInstallationId = jest.fn()
    const formValues = {
      appId: 'MOCK_ID',
      terminatesOn: 'TODAY',
      terminatedReason: 'SOME_REASON',
    }

    const curried = handleUninstallApp(email, uninstallApp, setInstallationId)

    curried(formValues)

    expect(uninstallApp).toHaveBeenCalledWith({
      ...formValues,
      terminatedBy: email,
    })

    expect(setInstallationId).toHaveBeenCalledWith(null)
  })
})

describe('handleUninstallSuccess', () => {
  it('should handle uninstallation', () => {
    const refetchInstallations = jest.fn()
    const closeModal = jest.fn()
    const success = true

    const curried = handleUninstallSuccess(refetchInstallations, closeModal, success)

    curried()

    expect(refetchInstallations).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleSetInstallationId', () => {
  it('should handle uninstallation', () => {
    const setInstallationId = jest.fn()
    const openModal = jest.fn()
    const installationId = 'MOCK_ID'

    const curried = handleSetInstallationId(setInstallationId, openModal, installationId)

    curried()

    expect(setInstallationId).toHaveBeenCalledWith(installationId)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})
