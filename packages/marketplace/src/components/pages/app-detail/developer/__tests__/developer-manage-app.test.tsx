import React from 'react'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import appState from '@/reducers/__stubs__/app-state'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import configureStore from 'redux-mock-store'
import Routes from '@/constants/routes'
import DeveloperManageApp from '../developer-manage-app'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { DeveloperAppDetailState } from '@/reducers/developer'
import {
  onAppDeleteModalAfterClose,
  onDeleteSuccess,
  onDeveloperAppRevisionModalAfterClose,
  onPendingRevisionButtonClick,
  onEditDetailButtonClick,
  onDeleteAppButtonClick,
} from '../developer-manage-app'

const mockState = {
  ...appState,
  auth: {
    loginSession: {
      loginIdentity: {
        clientId: '1',
      },
    },
  },
} as ReduxState

describe('ManageApp', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })

  it('should match snapshot', () => {
    expect(
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.DEVELOPER_APP_DETAIL, key: 'developerAppDetailRoute' }]}>
            <DeveloperManageApp
              id="test"
              pendingRevisions={false}
              appDetailState={appDetailDataStub as DeveloperAppDetailState}
            />
          </MemoryRouter>
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('onAppDeleteModalAfterClose', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onAppDeleteModalAfterClose(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('onDeleteSuccess', () => {
    it('should be called correctly', () => {
      const fn = onDeleteSuccess(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.DEVELOPER_MY_APPS)
    })
  })

  describe('onDeveloperAppRevisionModalAfterClose', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onDeveloperAppRevisionModalAfterClose(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('onPendingRevisionButtonClick', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onPendingRevisionButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })

  describe('onEditDetailButtonClick', () => {
    it('should be called correctly', () => {
      const mockAppId = '1'
      const fn = onEditDetailButtonClick(history, mockAppId)
      fn()
      expect(history.push).toBeCalledWith(`${Routes.DEVELOPER_MY_APPS}/${mockAppId}/edit`)
    })
  })

  describe('onDeleteAppButtonClick', () => {
    it('should be called correctly', () => {
      const mockFunction = jest.fn()
      const fn = onDeleteAppButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })
})
