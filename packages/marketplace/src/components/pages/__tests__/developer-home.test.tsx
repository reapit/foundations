import * as React from 'react'
import { MemoryRouter } from 'react-router'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import Routes from '@/constants/routes'
import DeveloperHome, {
  handleOnCardClick,
  handleAfterClose,
  handleFetchDeveloperApps,
  handleOnChange,
} from '../developer-home'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import { appDetailRequestData, removeAuthenticationCode } from '@/actions/app-detail'
import { developerAppShowModal } from '@/actions/developer-app-modal'
import { developerRequestData } from '@/actions/developer'
import { getMockRouterProps } from '@/utils/mock-helper'
import routes from '@/constants/routes'
import { AppDetailState } from '@/reducers/app-detail'

describe('Login', () => {
  const { history } = getMockRouterProps({})
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.DEVELOPER_MY_APPS, key: 'developerHomeRoute' }]}>
            <DeveloperHome />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleOnCardClick', () => {
    it('should run correctly', () => {
      const mockAppDetailState = {
        appDetailData: {
          data: {
            id: 'testId',
          },
        },
      } as AppDetailState
      const mockAppSummary: AppSummaryModel = {
        id: 'testId2',
      }
      const fn = handleOnCardClick(mockAppDetailState, spyDispatch)
      fn(mockAppSummary)
      expect(spyDispatch).toBeCalledWith(
        appDetailRequestData({
          id: mockAppSummary.id || '',
        }),
      )
    })
  })
  describe('handleAfterClose', () => {
    it('should run correctly', () => {
      const fn = handleAfterClose(spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(removeAuthenticationCode())
      expect(spyDispatch).toBeCalledWith(developerAppShowModal(false))
    })
  })
  describe('handleFetchDeveloperApps', () => {
    it('should run correctly', () => {
      const fn = handleFetchDeveloperApps(1, true, spyDispatch)
      fn()
      expect(fn).toHaveReturned
    })
    it('should dispatch developerRequestData', () => {
      const fn = handleFetchDeveloperApps(1, false, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(
        developerRequestData({
          page: 1,
        }),
      )
    })
  })

  describe('handleOnChange', () => {
    it('should run correctly', () => {
      const fn = handleOnChange(history)
      fn(1)
      expect(history.push).toBeCalledWith(`${routes.DEVELOPER_MY_APPS}?page=${1}`)
    })
  })
})
