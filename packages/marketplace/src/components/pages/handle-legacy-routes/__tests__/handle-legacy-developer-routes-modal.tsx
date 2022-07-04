import React from 'react'
import routes from '@/constants/routes'
import { render } from '../../../../tests/react-testing'
import HandleLegacyDeveloperRoutesModal, {
  handleBtnBackToMarketplace,
  handleBtnGoThereNow,
} from '../handle-legacy-developer-routes-modal'

jest.mock('@/core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))
import { history } from '@/core/router'

describe('HandleLegacyDeveloperRoutesModal', () => {
  test('handleBtnBackToMarketplace should work correctly', () => {
    handleBtnBackToMarketplace()
    expect(history.push).toHaveBeenCalledWith(routes.APPS)
  })

  test('handleBtnGoTherNow should work correctly', () => {
    window.open = jest.fn()
    handleBtnGoThereNow()
    expect(window.open).toHaveBeenCalledWith(window.reapit.config.developerPortalUrl, '_self', 'noopener')
  })

  test('HandleLegacyDeveloperRoutesModal - should match snapshoot', () => {
    expect(render(<HandleLegacyDeveloperRoutesModal />)).toMatchSnapshot()
  })
})
