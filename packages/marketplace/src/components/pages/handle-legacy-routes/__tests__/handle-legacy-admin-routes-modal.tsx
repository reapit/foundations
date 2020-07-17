import React from 'react'
import routes from '@/constants/routes'
import { mount } from 'enzyme'
import HandleLegacyAdminRoutesModal, {
  handleBtnBackToMarketplace,
  handleBtnGoThereNow,
} from '../handle-legacy-admin-routes-modal'

jest.mock('@/core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))
import { history } from '@/core/router'

describe('HandleLegacyAdminRoutesModal', () => {
  test('handleBtnBackToMarketplace should work correctly', () => {
    handleBtnBackToMarketplace()
    expect(history.push).toHaveBeenCalledWith(routes.APPS)
  })

  test('handleBtnGoTherNow should work correctly', () => {
    window.open = jest.fn()
    handleBtnGoThereNow()
    expect(window.open).toHaveBeenCalledWith(window.reapit.config.adminPortalUrl, '_self')
  })

  test('HandleLegacyAdminRoutesModal - should match snapshoot', () => {
    expect(mount(<HandleLegacyAdminRoutesModal />)).toMatchSnapshot()
  })
})
