import React from 'react'
import { mount } from 'enzyme'
import { AdminStats } from '../admin-stats'
import appState from '@/reducers/__stubs__/app-state'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'

describe('Admin Stats', () => {
  it('should match snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)
    const wrapper = mount(
      <ReactRedux.Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: Routes.STATS, key: 'adminStats' }]}>
          <AdminStats />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('setArea APPS', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)
    const wrapper = mount(
      <ReactRedux.Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: Routes.STATS, key: 'adminStats' }]}>
          <AdminStats />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )
    const button = wrapper.find('[dataTest="area-apps-btn"]')
    button.simulate('click')
    expect(button).toHaveLength(1)

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('button APPS should have variant primary', () => {
      expect(button.prop('variant')).toEqual('primary')
    })
  })

  it('should show loading', () => {
    const mockStore = configureStore()
    const loadingState = {
      ...appState,
      adminStats: {
        ...appState.adminStats,
        loading: true,
      },
    }
    const store = mockStore(loadingState)
    const wrapper = mount(
      <ReactRedux.Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: Routes.STATS, key: 'adminStats' }]}>
          <AdminStats />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
