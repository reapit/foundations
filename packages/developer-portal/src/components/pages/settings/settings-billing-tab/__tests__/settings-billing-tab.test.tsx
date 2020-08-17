import React from 'react'
import { mount } from 'enzyme'
import DeveloperBillingTabPage from '../settings-billing-tab'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

jest.mock('react-router-dom', () => {
  return {
    useRouteMatch: jest.fn(() => {
      return {
        url: '123',
      }
    }),
    useHistory: jest.fn(),
  }
})

describe('DeveloperDesktopPage', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('SettingsBillingTabPage', () => {
    it('should match snapshot', () => {
      const wrapper = mount(
        <Provider store={store}>
          <DeveloperBillingTabPage />
        </Provider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
