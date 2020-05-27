import * as React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ClientAppSummary } from '@/reducers/client/app-summary'
import { Client, handleAfterClose, handleOnChange, handleOnCardClick } from '../client'
import { addQuery } from '@/utils/client-url-params'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { getMockRouterProps } from '@/utils/mock-helper'

const createState = appSummaryState => {
  return {
    ...appState,
    client: {
      ...appState.client,
      appSummary: { ...appState.client, ...appSummaryState },
    },
  }
}

describe('Client', () => {
  const { history } = getMockRouterProps({})
  let store

  beforeEach(() => {
    /* mocking store */
    // spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot when LOADING false', () => {
    const appSummaryState = {
      isAppSummaryLoading: false,
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT, key: 'clientRoute' }]}>
            <Client />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    const appSummaryState = {
      isAppSummaryLoading: true,
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT, key: 'clientRoute' }]}>
            <Client />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when featured apps is empty []', () => {
    const appSummaryState = {
      isAppSummaryLoading: false,
      data: {
        featuredApps: [] as AppSummaryModel[],
        apps: appsDataStub,
      } as ClientAppSummary,
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT, key: 'clientRoute' }]}>
            <Client />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when featured apps is undefined', () => {
    const appSummaryState = {
      isAppSummaryLoading: false,
      data: {
        featuredApps: undefined,
        apps: appsDataStub,
      } as ClientAppSummary,
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT, key: 'clientRoute' }]}>
            <Client />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleOnChange', () => {
    it('should call push correctly', () => {
      const fn = handleOnChange(history)
      fn(1)
      expect(history.push).toBeCalledWith(addQuery({ page: 1 }))
    })
  })

  describe('handleAfterClose', () => {
    const setVisible = jest.fn()
    const fn = handleAfterClose({ setVisible })
    fn()
    expect(setVisible).toBeCalledWith(false)
  })

  describe('handleOnCardClick', () => {
    it('should run correctly', () => {
      const mockAppSummary: AppSummaryModel = {
        id: 'testId',
      }
      const fn = handleOnCardClick(history)
      fn(mockAppSummary)
      expect(history).toBeCalledWith(`${Routes.CLIENT}/${mockAppSummary.id}`)
    })
  })

  describe('show welcome modal when firstLogin', () => {
    it('should run correctly', () => {
      const appSummaryState = {
        isAppSummaryLoading: false,
        data: {
          featuredApps: [] as AppSummaryModel[],
          apps: appsDataStub,
        } as ClientAppSummary,
      }
      const mockStore = configureStore()
      store = mockStore(createState(appSummaryState))
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <Client />
          </Router>
        </Provider>,
      )
      setTimeout(() => {
        expect(wrapper.find(<ClientWelcomeMessageModal visible={true} onAccept={jest.fn()} />)).toEqual(1)
      }, 200)
    })
  })
})
