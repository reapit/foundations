import * as React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ClientAppSummary } from '@/reducers/client/app-summary'
import {
  Client,
  handleSetStateViewBrowse,
  handleFetchAppDetail,
  handleInstallationsSetFormState,
  handleAfterClose,
  handleOnChange,
  handleOnCardClick,
  onCardClickParams,
} from '../client'
import { addQuery } from '@/utils/client-url-params'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { setAppDetailModalStateBrowse } from '@/actions/app-detail-modal'
import { appDetailRequestData } from '@/actions/app-detail'
import { appInstallationsSetFormState } from '@/actions/app-installations'

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
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleOnChange(mockHistory)
      fn(1)
      expect(mockHistory.push).toBeCalledWith(addQuery({ page: 1 }))
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
      const mockProps: onCardClickParams = {
        setVisible: jest.fn(),
        appDetail: {
          authentication: {
            loading: false,
            code: '200',
          },
          error: false,
          loading: false,
          appDetailData: {
            data: appsDataStub.data.data![0],
          },
          isStale: true,
        },
        setStateViewBrowse: jest.fn(),
        fetchAppDetail: jest.fn(),
        clientId: 'ABC',
      }
      const fn = handleOnCardClick(mockProps)
      fn({ id: '1' })
      expect(mockProps.setVisible).toBeCalled()
      expect(mockProps.fetchAppDetail).toBeCalled()
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

  it('handleSetStateViewBrowse should run correctly', () => {
    const dispatch = jest.fn()
    const fn = handleSetStateViewBrowse(dispatch)
    fn()
    expect(dispatch).toBeCalledWith(setAppDetailModalStateBrowse())
  })

  it('handleFetchAppDetail should run correctly', () => {
    const dispatch = jest.fn()
    const id = 'id'
    const clientId = 'clientId'
    const fn = handleFetchAppDetail(dispatch)
    fn(id, clientId)
    expect(dispatch).toBeCalledWith(appDetailRequestData({ id, clientId }))
  })

  it('handleInstallationsSetFormState should run correctly', () => {
    const dispatch = jest.fn()
    const formState = 'DONE'
    const fn = handleInstallationsSetFormState(dispatch)
    fn(formState)
    expect(dispatch).toBeCalledWith(appInstallationsSetFormState(formState))
  })
})
