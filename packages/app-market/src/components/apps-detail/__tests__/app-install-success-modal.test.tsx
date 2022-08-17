import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { AppInstallSuccesModalContent, handleCloseModal } from '../app-install-success-modal'
import { useReapitConnect } from '@reapit/connect-session'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectIsDesktop: false,
  })),
}))
jest.mock('../../../core/analytics')

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('AppInstallSuccesModalContent', () => {
  it('should match a snapshot where app is  directApi', () => {
    expect(
      render(
        <AppInstallSuccesModalContent
          app={mockAppDetailModel}
          closeModal={jest.fn()}
          developer={'MOCK_DEVELOPER_NAME'}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where app not directApi', () => {
    expect(
      render(
        <AppInstallSuccesModalContent
          app={{ ...mockAppDetailModel, isDirectApi: false }}
          closeModal={jest.fn()}
          developer={'MOCK_DEVELOPER_NAME'}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where in desktop mode', () => {
    mockUseReapitConnect.mockReturnValue({
      connectIsDesktop: true,
    })

    expect(
      render(
        <AppInstallSuccesModalContent
          app={{ ...mockAppDetailModel, isDirectApi: false }}
          closeModal={jest.fn()}
          developer={'MOCK_DEVELOPER_NAME'}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleCloseModal', () => {
  it('should handle closing modal', () => {
    const closeModal = jest.fn()
    const appName = 'MOCK_APP_NAME'

    const curried = handleCloseModal(closeModal, appName)

    curried()

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickBackToAppAfterInstall, true, {
      appName,
    })
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
