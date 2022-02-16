import React from 'react'
import AppDetailV8Edit from '..'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import appState from '@/reducers/__stubs__/app-state'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'

const mockState = {
  ...appState,
  auth: {
    loginType: 'DEVELOPER',
  },
} as ReduxState

describe('App Detail edit V8', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'developerAppDetailRoute' }]}>
            <AppDetailV8Edit />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
