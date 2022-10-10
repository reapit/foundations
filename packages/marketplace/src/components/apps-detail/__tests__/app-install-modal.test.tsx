import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { mockDesktopIntegrationTypeModelPagedResult } from '../../../tests/__stubs__/desktop-integration-types'
import { AppInstallModalContent, handleCloseModal, handleInstall } from '../app-install-modal'
import { useReapitConnect } from '@reapit/connect-session'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'

jest.mock('@reapit/utils-react', () => ({
  ...jest.requireActual('@reapit/utils-react'),
  useReapitUpdate: jest.fn(() => [false, null, jest.fn()]),
}))
jest.mock('../../../core/analytics')

const mockLoginIdentity = {
  developerId: 'MOCK_DEVELOPER_ID',
  clientId: 'MOCK_CLIENT_ID',
  email: 'MOCK_EMAIL',
  offGroupName: 'MOCK_OFFICE_GROUP',
  offGrouping: true,
  groups: ['OrganisationAdmin'],
}

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: mockLoginIdentity,
    },
    connectIsDesktop: false,
  })),
}))

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('AppInstallModalContent', () => {
  it('should match a snapshot where an org admin and web mode', () => {
    expect(
      render(
        <AppInstallModalContent
          app={mockAppDetailModel}
          closeModal={jest.fn()}
          successOpenModal={jest.fn()}
          refetchApp={jest.fn()}
          desktopIntegrationTypes={mockDesktopIntegrationTypeModelPagedResult}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where an org admin and desktop mode', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        loginIdentity: mockLoginIdentity,
      },
      connectIsDesktop: true,
    })
    expect(
      render(
        <AppInstallModalContent
          app={mockAppDetailModel}
          closeModal={jest.fn()}
          successOpenModal={jest.fn()}
          refetchApp={jest.fn()}
          desktopIntegrationTypes={mockDesktopIntegrationTypeModelPagedResult}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where has off grouping, not an org admin', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        loginIdentity: {
          ...mockLoginIdentity,
          groups: ['MarketplaceAdmin'],
        },
      },
    })
    expect(
      render(
        <AppInstallModalContent
          app={mockAppDetailModel}
          closeModal={jest.fn()}
          successOpenModal={jest.fn()}
          refetchApp={jest.fn()}
          desktopIntegrationTypes={mockDesktopIntegrationTypeModelPagedResult}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where not off grouping, not an org admin', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        loginIdentity: {
          ...mockLoginIdentity,
          offGrouping: false,
          groups: ['MarketplaceAdmin'],
        },
      },
    })
    expect(
      render(
        <AppInstallModalContent
          app={mockAppDetailModel}
          closeModal={jest.fn()}
          successOpenModal={jest.fn()}
          refetchApp={jest.fn()}
          desktopIntegrationTypes={mockDesktopIntegrationTypeModelPagedResult}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where app is free', () => {
    expect(
      render(
        <AppInstallModalContent
          app={{ ...mockAppDetailModel, isFree: true }}
          closeModal={jest.fn()}
          successOpenModal={jest.fn()}
          refetchApp={jest.fn()}
          desktopIntegrationTypes={mockDesktopIntegrationTypeModelPagedResult}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where not free but no pricing details', () => {
    expect(
      render(
        <AppInstallModalContent
          app={{ ...mockAppDetailModel, pricingUrl: undefined }}
          closeModal={jest.fn()}
          successOpenModal={jest.fn()}
          refetchApp={jest.fn()}
          desktopIntegrationTypes={mockDesktopIntegrationTypeModelPagedResult}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleInstall', () => {
  it('should  return the correct number of cols when mobile', async () => {
    const installApp = jest.fn(() => Promise.resolve(true))
    const refetchApp = jest.fn()
    const closeModal = jest.fn()
    const successOpenModal = jest.fn()
    const appName = 'MOCK_APP_NAME'
    const appId = 'MOCK_APP_ID'
    const clientId = 'MOCK_CLIENT_ID'
    const email = 'MOCK_EMAIL'

    const curried = handleInstall(installApp, refetchApp, closeModal, successOpenModal, appName, appId, clientId, email)

    await curried()

    expect(installApp).toHaveBeenCalledWith({
      appId,
      clientId,
      approvedBy: email,
    })

    expect(refetchApp).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(successOpenModal).toHaveBeenCalledTimes(1)
    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickConfirnInstallation, true, { appName, clientId, email })
    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.InstallationSuccess, true, { appName, clientId, email })
  })
})

describe('handleCloseModal', () => {
  it('should handle closing modal', () => {
    const closeModal = jest.fn()
    const appName = 'MOCK_APP_NAME'
    const clientId = 'MOCK_CLIENT_ID'
    const email = 'MOCK_EMAIL'

    const curried = handleCloseModal(closeModal, appName, clientId, email)

    curried()

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickCloseWithoutInstalling, true, {
      appName,
      clientId,
      email,
    })
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
