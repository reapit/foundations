import * as React from 'react'
import { MemoryRouter } from 'react-router'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import Routes from '@/constants/routes'
import DeveloperHome, {
  handleOnCardClick,
  handleOnChange,
  onShowSubmitAppModal,
  onCloseSubmitAppModal,
} from '../developer-home'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import { getMockRouterProps } from '@/utils/mock-helper'
import routes from '@/constants/routes'

describe('Login', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
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
      const mockAppSummary: AppSummaryModel = {
        id: 'testId',
      }
      const fn = handleOnCardClick(history)
      fn(mockAppSummary)
      expect(history.push).toBeCalledWith(`${Routes.DEVELOPER_MY_APPS}/${mockAppSummary.id}`)
    })
  })

  describe('handleOnChange', () => {
    it('should run correctly', () => {
      const fn = handleOnChange(history)
      fn(1)
      expect(history.push).toBeCalledWith(`${routes.DEVELOPER_MY_APPS}?page=${1}`)
    })
  })

  describe('onShowSubmitAppModal', () => {
    it('should set as visible', () => {
      const setSubmitAppModalVisible = jest.fn()
      onShowSubmitAppModal(setSubmitAppModalVisible)()
      expect(setSubmitAppModalVisible).toHaveBeenCalledWith(true)
    })
  })

  describe('onCloseSubmitAppModal', () => {
    it('should set visible to false', () => {
      const setSubmitAppModalVisible = jest.fn()
      onCloseSubmitAppModal(setSubmitAppModalVisible)()
      expect(setSubmitAppModalVisible).toHaveBeenCalledWith(false)
    })
  })
})
