import * as React from 'react'
import { mount } from 'enzyme'
import AppToggleVisibilitySection, { handleOnCheckboxChange } from '../app-toggle-visibility-section'
import { updateAppRestrictionsService } from '../../../../services/apps'

jest.mock('../../../../services/apps', () => ({
  updateAppRestrictionsService: jest.fn(() => true),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
      },
    },
  }),
}))

jest.mock('../../../../utils/use-org-id', () => ({
  useOrgId: () => ({
    orgIdState: {
      orgId: 'SOME_ID',
      orgName: 'SOME_NAME',
      orgClientId: 'SOME_CLIENT_ID',
    },
  }),
}))

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/offices',
  })),

  useHistory: jest.fn(() => ({
    history: () => {},
  })),
}))

describe('AppToggleVisibilitySection', () => {
  it('should match a snapshot', () => {
    const stubApp = { name: 'APP_NAME', developer: 'APP_DEVELOPER' }
    const mockReFetchApp = jest.fn()
    expect(mount(<AppToggleVisibilitySection app={stubApp} reFetchApp={mockReFetchApp} />)).toMatchSnapshot()
  })
})

describe('handleOnCheckboxChange', () => {
  it('should toggle checked', async () => {
    const success = jest.fn()
    const error = jest.fn()
    const mockSetChecked = jest.fn()
    const mockReFetchApp = jest.fn()
    const mockAppId = 'SOME_ID'
    const mockOrgId = 'SBOX'

    const curried = handleOnCheckboxChange(mockSetChecked, mockReFetchApp, mockAppId, mockOrgId, true, success, error)

    await curried()

    expect(mockSetChecked).toHaveBeenCalledWith(false)
    expect(mockReFetchApp).toHaveBeenCalledTimes(1)
    expect(updateAppRestrictionsService).toHaveBeenLastCalledWith(
      {
        appId: mockAppId,
        status: 'exclude',
      },
      mockOrgId,
    )
    expect(success).toHaveBeenCalled()
  })

  it('should show an error message if fetching fails and reset checkbox', async () => {
    ;(updateAppRestrictionsService as jest.Mock).mockReturnValueOnce(undefined)
    const success = jest.fn()
    const error = jest.fn()
    const mockSetChecked = jest.fn()
    const mockReFetchApp = jest.fn()
    const mockAppId = 'SOME_ID'
    const mockOrgId = 'SBOX'

    const curried = handleOnCheckboxChange(mockSetChecked, mockReFetchApp, mockAppId, mockOrgId, true, success, error)

    await curried()

    expect(mockSetChecked).toHaveBeenCalledWith(false)
    expect(mockReFetchApp).not.toHaveBeenCalled()
    expect(updateAppRestrictionsService).toHaveBeenLastCalledWith(
      {
        appId: mockAppId,
        status: 'exclude',
      },
      mockOrgId,
    )
    expect(mockSetChecked).toHaveBeenLastCalledWith(true)
    expect(error).toHaveBeenCalled()
  })
})
