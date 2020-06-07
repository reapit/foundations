import React from 'react'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { shallow, mount } from 'enzyme'
import AuthFlow from '@/constants/app-auth-flow'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import AppContent, {
  handleUninstallSuccess,
  renderAuthentication,
  renderInstallationsTable,
  handleOpenAppPreview,
} from '../app-content/developer-app-content'
import { Provider } from 'react-redux'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'

const mockState = {
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

  developer: {
    developerAppDetail: appDetailDataStub,
  },
} as ReduxState

describe('AppContent', () => {
  const mockStore = configureStore()
  const store = mockStore(mockState)

  test('AppContent - should match snapshoot', () => {
    expect(
      mount(
        <Provider store={store}>
          <AppContent appDetailState={mockState.developer.developerAppDetail} />
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

  describe('renderAuthentication', () => {
    it('should render AppAuthenticationDetail when authFlow = AuthFlow.CLIENT_SECRET', () => {
      const result = renderAuthentication({ authFlow: AuthFlow.CLIENT_SECRET, externalId: '1', id: '1' })
      const wrapper = shallow(<Provider store={store}>{result}</Provider>)
      expect(wrapper.find('AppAuthenticationDetailConnect').length).toBe(1)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render client id when authFlow != AuthFlow.USER_SESSION', () => {
      const result = renderAuthentication({ authFlow: AuthFlow.USER_SESSION, externalId: '1', id: '1' })
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper.find('[data-test="authentication-client-id"]').length).toBe(1)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderInstallationsTable should run correctly', () => {
    it('should render empty text when have data', () => {
      const result = renderInstallationsTable({ data: installationsStub.data as InstallationModel[], columns: [] })
      const wrapper = mount(<div>{result}</div>)
      expect(wrapper.find('[data-test="render-installations-table"]').length).toBe(1)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render table when have have data', () => {
      const result = renderInstallationsTable({ data: [], columns: [] })
      const wrapper = mount(<div>{result}</div>)
      console.log(wrapper.debug())
      expect(wrapper.find('[data-test="render-installations-table-empty-text"]').length).toBe(1)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('handleOpenAppPreview', () => {
    it('should run correctly', () => {
      const appId = 'appId'
      const spyOpenUrl = jest.spyOn(window, 'open')
      const fn = handleOpenAppPreview(appId)
      fn()
      expect(spyOpenUrl).toBeCalledWith('developer/apps/appId/preview', '_blank')
    })
  })
})
