import React from 'react'
import { shallow } from 'enzyme'
import SettingsPage, { RedirectToSettingsProfilePage } from '../settings'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  auth: {
    loginSession: {
      loginIdentity: {
        isAdmin: true,
      },
    },
  },
} as ReduxState

describe('SettingsPage', () => {
  describe('RedirectToSettingsProfilePage', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<RedirectToSettingsProfilePage />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('SettingsPage', () => {
    it('should match snapshot', () => {
      const mockStore = configureStore()
      const store = mockStore(mockState)

      const wrapper = shallow(
        <Provider store={store}>
          <SettingsPage />
        </Provider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
