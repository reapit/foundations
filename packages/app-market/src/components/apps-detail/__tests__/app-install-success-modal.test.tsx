import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { AppInstallSuccesModalContent } from '../app-install-success-modal'
import { useReapitConnect } from '@reapit/connect-session'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectIsDesktop: false,
  })),
}))

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
