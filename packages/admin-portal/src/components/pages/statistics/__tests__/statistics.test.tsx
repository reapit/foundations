import React from 'react'
import { render } from '../../../../tests/react-testing'
import { Statistics } from '../statistics'
import appState from '@/reducers/__stubs__/app-state'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'

describe('Admin Stats', () => {
  it('should match snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)
    const wrapper = render(
      <ReactRedux.Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: Routes.STATS, key: 'adminStats' }]}>
          <Statistics />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('setArea APPS', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)
    const wrapper = render(
      <ReactRedux.Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: Routes.STATS, key: 'adminStats' }]}>
          <Statistics />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  it('should show loading', () => {
    const mockStore = configureStore()
    const loadingState = {
      ...appState,
      adminStats: {
        ...appState.apps.statistics,
        loading: true,
      },
    }
    const store = mockStore(loadingState)
    const wrapper = render(
      <ReactRedux.Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: Routes.STATS, key: 'adminStats' }]}>
          <Statistics />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
