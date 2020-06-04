import React from 'react'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { DeveloperAppDetailState } from '@/reducers/developer'
import {
  Aside,
  ManageApp,
  renderListedStatus,
  onAppDeleteModalAfterClose,
  onDeleteSuccess,
  onDeveloperAppRevisionModalAfterClose,
  onPendingRevisionButtonClick,
  onEditDetailButtonClick,
  onDeleteAppButtonClick,
} from '../aside'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import appState from '@/reducers/__stubs__/app-state'
import Routes from '@/constants/routes'
import { getMockRouterProps } from '@/utils/mock-helper'

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

describe('Aside', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })

  test('Aside - should match snapshot', () => {
    expect(
      shallow(
        <Aside
          appDetailState={appDetailDataStub as DeveloperAppDetailState}
          desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })

  describe('renderListedStatus', () => {
    it('should render listed if isListed = true', () => {
      const result = renderListedStatus(true)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper.text()).toBe('Listed <FaCheck />')
      expect(wrapper).toMatchSnapshot()
    })
    it('should render listed if isListed = false', () => {
      const result = renderListedStatus(false)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper.text()).toBe('Not Listed')
      expect(wrapper).toMatchSnapshot()
    })
  })

  test('ManageApp - should match snapshot', () => {
    expect(
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.DEVELOPER_APP_DETAIL, key: 'developerAppDetailRoute' }]}>
            <ManageApp
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
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = onAppDeleteModalAfterClose(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('onDeleteSuccess', () => {
    it('should run correctly', () => {
      const fn = onDeleteSuccess(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.DEVELOPER_MY_APPS)
    })
  })

  describe('onDeveloperAppRevisionModalAfterClose', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = onDeveloperAppRevisionModalAfterClose(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('onPendingRevisionButtonClick', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = onPendingRevisionButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })

  describe('onEditDetailButtonClick', () => {
    it('should run correctly', () => {
      const mockAppId = '1'
      const fn = onEditDetailButtonClick(history, mockAppId)
      fn()
      expect(history.push).toBeCalledWith(`${Routes.DEVELOPER_MY_APPS}/${mockAppId}/edit`)
    })
  })

  describe('onDeleteAppButtonClick', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = onDeleteAppButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })
})
