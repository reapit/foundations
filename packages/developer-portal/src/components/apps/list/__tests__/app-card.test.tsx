import React, { MouseEvent } from 'react'
import { render } from '../../../../tests/react-testing'
import { AppCard, handleDeleteApp, handleOpenModal, handleRefreshApps } from '../app-card'
import { mockAppDetailModel } from '../../../../tests/__stubs__/apps'
import { useReapitConnect } from '@reapit/connect-session'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        groups: [],
      },
    },
  })),
}))

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('AppCard', () => {
  it('should match a snapshot for a regular user', () => {
    expect(render(<AppCard app={mockAppDetailModel} />)).toMatchSnapshot()
  })

  it('should match a snapshot for an admin', () => {
    mockUseReapitConnect.mockReturnValueOnce({
      connectSession: {
        loginIdentity: {
          groups: ['FoundationsDeveloperAdmin'],
        },
      },
    })
    expect(render(<AppCard app={mockAppDetailModel} />)).toMatchSnapshot()
  })

  it('should match a snapshot for an admin with delete protection', () => {
    mockUseReapitConnect.mockReturnValueOnce({
      connectSession: {
        loginIdentity: {
          groups: ['FoundationsDeveloperAdmin'],
        },
      },
    })
    expect(render(<AppCard app={{ ...mockAppDetailModel, deletionProtection: true }} />)).toMatchSnapshot()
  })

  it('should handle refresh apps', () => {
    const appDeleted = true
    const refreshApps = jest.fn()

    const curried = handleRefreshApps(refreshApps, appDeleted)

    curried()

    expect(refreshApps).toHaveBeenCalledTimes(1)
  })

  it('should handle delete apps', () => {
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent
    const deleteApps = jest.fn()

    const curried = handleDeleteApp(deleteApps)

    curried(event)

    expect(deleteApps).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })

  it('should handle opening modal', () => {
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent
    const openModal = jest.fn()

    const curried = handleOpenModal(openModal)

    curried(event)

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})
