import React from 'react'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { mount } from 'enzyme'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import AppContent, {
  handleUninstallSuccess,
  handleOpenAppPreview,
  generateInstallationTableColumns,
} from '../app-content'
import { Provider } from 'react-redux'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  auth: {
    loginSession: {
      loginIdentity: {
        developerId: '1',
      },
    },
  },
  installations: {
    installationsAppData: installationsStub,
  },
} as ReduxState

describe('AppContent', () => {
  const mockStore = configureStore()
  const store = mockStore(mockState)

  test('AppContent - should match snapshoot', () => {
    expect(
      mount(
        <Provider store={store}>
          <AppContent appDetailState={mockState.apps.detail} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  test('handleUninstallSuccess should run correctly', () => {
    const mockedHandleUninstallSuccessParams = {
      handleAfterClose: jest.fn(),
      setUninstallApp: jest.fn(),
      developerId: '1',
      appId: '2',
      dispatch: jest.fn(),
    }

    const { appId, developerId, handleAfterClose, dispatch, setUninstallApp } = mockedHandleUninstallSuccessParams

    handleUninstallSuccess(mockedHandleUninstallSuccessParams)()
    expect(handleAfterClose).toHaveBeenCalledWith({ setUninstallApp })
    expect(dispatch).toHaveBeenCalledWith(
      appInstallationsRequestData({
        appId: [appId],
        pageNumber: 1,
        pageSize: GET_ALL_PAGE_SIZE,
        isInstalled: true,
        developerId: [developerId],
      }),
    )
  })

  describe('handleOpenAppPreview', () => {
    it('should run correctly', () => {
      const appId = 'appId'
      const spyOpenUrl = jest.spyOn(window, 'open')
      const fn = handleOpenAppPreview(appId, appDetailDataStub.data || {})
      fn()
      expect(spyOpenUrl).toBeCalledWith('/apps/appId/preview', '_blank')
    })
  })

  describe('generateInstallationTableColumns', () => {
    it('should run correctly', () => {
      const result = generateInstallationTableColumns(jest.fn())()
      expect(result).toHaveLength(3)
    })
  })
})
