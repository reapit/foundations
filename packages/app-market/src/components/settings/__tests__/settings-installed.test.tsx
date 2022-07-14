import React from 'react'
import SettingsInstalled, {
  getAppIds,
  handleSetInstallationDetails,
  handleUninstallApp,
  handleUninstallSuccess,
} from '../settings-installed'
import { render, setViewport } from '../../../tests/react-testing'
import { useReapitGet } from '@reapit/utils-react'
import { mockInstallationModelPagedResult } from '../../../tests/__stubs__/installations'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('SettingsInstalled', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValue([{ ...mockInstallationModelPagedResult }])

    expect(render(<SettingsInstalled />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])

    expect(render(<SettingsInstalled />)).toMatchSnapshot()
  })

  it('should match a snapshot when no installations', () => {
    mockUseReapitGet.mockReturnValue([{ totalCount: 0 }, false])

    expect(render(<SettingsInstalled />)).toMatchSnapshot()
  })

  it('should match a snapshot when no response', () => {
    mockUseReapitGet.mockReturnValue([null, false])

    expect(render(<SettingsInstalled />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    mockUseReapitGet.mockReturnValue([{ ...mockInstallationModelPagedResult }])
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<SettingsInstalled />)).toMatchSnapshot()
  })
})

describe('handleUninstallApp', () => {
  it('should handle uninstallation', () => {
    const email = 'mock@mail.com'
    const appId = 'MOCK_APP_ID'
    const uninstallApp = jest.fn()
    const setInstallationId = jest.fn()
    const formValues = {
      appId: 'MOCK_ID',
      terminatesOn: 'TODAY',
      terminatedReason: 'SOME_REASON',
    }

    const curried = handleUninstallApp(email, uninstallApp, setInstallationId, appId)

    curried(formValues)

    expect(uninstallApp).toHaveBeenCalledWith({
      ...formValues,
      appId,
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

describe('handleSetInstallationDetails', () => {
  it('should handle uninstallation', () => {
    const setInstallationId = jest.fn()
    const openModal = jest.fn()
    const installationId = 'MOCK_ID'
    const appId = 'MOCK_ID'

    const curried = handleSetInstallationDetails(setInstallationId, openModal, installationId, appId)

    curried()

    expect(setInstallationId).toHaveBeenCalledWith({ installationId, appId })
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('getAppIds', () => {
  it('should handle getting app ids', () => {
    const curried = getAppIds(mockInstallationModelPagedResult)

    const result = curried()

    expect(result).toEqual(['MOCK_APP_ID', 'MOCK_APP_ID'])
  })
})
