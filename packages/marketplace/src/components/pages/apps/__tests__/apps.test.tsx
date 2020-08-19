import * as React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { Apps, handleAfterClose, handleOnChange, handleOnCardClick, handleLoadMore } from '../apps'
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
import { fetchApps } from '@/actions/apps'

jest.mock('rc-animate')

const createState = appSummaryState => {
  return {
    ...appState,
    apps: {
      ...appState.apps,
      list: { ...appState.apps.list, ...appSummaryState },
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
      isLoading: false,
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientRoute' }]}>
            <Apps />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    const appSummaryState = {
      isLoading: true,
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientRoute' }]}>
            <Apps />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when featured apps is empty []', () => {
    const appSummaryState = {
      isLoading: false,
      data: {
        featuredApps: [],
        list: appsDataStub,
      },
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientRoute' }]}>
            <Apps />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when featured apps is null', () => {
    const appSummaryState = {
      isLoading: false,
      data: {
        featuredApps: [],
        list: appsDataStub,
      },
    }
    const mockStore = configureStore()
    store = mockStore(createState(appSummaryState))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientRoute' }]}>
            <Apps />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleLoadMore', () => {
    it('should call dispatch', () => {
      const dispatch = jest.fn()
      const fn = handleLoadMore({ dispatch, preview: false, loading: false, numOfItemsPerPage: 12, pageNumber: 1 })
      fn()
      expect(dispatch).toHaveBeenCalledWith(
        fetchApps({ pageNumber: 2, preview: false, isInfinite: true, pageSize: 12 }),
      )
    })
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
      expect(history.push).toBeCalledWith(`${Routes.APPS}/${mockAppSummary.id}`)
    })
  })

  describe('show welcome modal when firstLogin', () => {
    it('should run correctly', () => {
      const appSummaryState = {
        isLoading: false,
        data: {
          list: [] as AppSummaryModel[],
          featuredApps: appsDataStub,
        },
      }
      const mockStore = configureStore()
      store = mockStore(createState(appSummaryState))
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <Apps />
          </Router>
        </Provider>,
      )
      setTimeout(() => {
        expect(wrapper.find(<ClientWelcomeMessageModal visible={true} onAccept={jest.fn()} />)).toEqual(1)
      }, 200)
    })
  })
})
