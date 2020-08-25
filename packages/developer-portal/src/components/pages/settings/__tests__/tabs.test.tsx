import * as React from 'react'
import { mount } from 'enzyme'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

import { Tabs, tabConfigs } from '../tabs'

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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({ replace: jest.fn() }),
  useRouteMatch: () => ({ url: 'test' }),
}))

describe('Tabs', () => {
  it('should match a snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(mockState)

    expect(
      mount(
        <Provider store={store}>
          <Tabs />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('tabConfigs', () => {
    it('should run correctly when isAdmin = true and isProd = false ', () => {
      const history = {
        push: jest.fn(),
      }
      const result = tabConfigs({ currentUrl: 'test', history, role: 'admin' })
      expect(result).toHaveLength(3)
    })

    it('should run correctly when isAdmin = false', () => {
      const history = {
        push: jest.fn(),
      }
      const result = tabConfigs({ currentUrl: 'test', history, role: 'user' })
      expect(result).toHaveLength(1)
    })
  })
})
