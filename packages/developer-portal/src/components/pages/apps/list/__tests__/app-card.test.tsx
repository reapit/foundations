import React, { MouseEvent } from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppCard, handleDeleteApp, handleRefreshApps } from '../app-card'
import { mockAppDetailModel } from '../../../../../tests/__stubs__/apps'

jest.mock('../../state/use-app-state')

describe('AppCard', () => {
  it('should match a snapshot', () => {
    expect(render(<AppCard app={mockAppDetailModel} />)).toMatchSnapshot()
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
})
