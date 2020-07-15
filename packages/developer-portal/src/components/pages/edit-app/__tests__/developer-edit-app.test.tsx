import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import DeveloperSubmitApp, {
  labelTextOfField,
  renderErrors,
  handleSubmitApp,
  handleGoBackToApps,
  handleOnSubmitAnotherApp,
  generateInitialValues,
  handleOpenAppPreview,
  handleSubmitAppSuccess,
  handleSubmitAppError,
  sanitizeAppData,
} from '../developer-edit-app'
import { getMockRouterProps } from '@/utils/mock-helper'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
import { submitAppSetFormState } from '@/actions/submit-app'
import { CreateAppModel } from '@/types/marketplace-api-schema'
import { submitRevision } from '@/actions/submit-revision'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

jest.mock('@/utils/cookie', () => ({
  getCookieString: jest.fn(),
  setCookieString: jest.fn(),
}))

describe('DeveloperSubmitApp', () => {
  const { history } = getMockRouterProps({})
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot when pendingRevisions = true', () => {
    const mockStore = configureStore()
    const clonedAppState = JSON.parse(JSON.stringify(appState))
    clonedAppState.appDetail.appDetailData = { data: { pendingRevisions: true } }
    const customStore = mockStore(clonedAppState)

    window.reapit.config.appEnv = 'development'
    expect(
      mount(
        <ReactRedux.Provider store={customStore}>
          {/* weird snapshots bug: https://github.com/ReactTraining/react-router/issues/5579 */}
          <MemoryRouter keyLength={0} initialEntries={[{ pathname: Routes.REGISTER, key: 'what' }]}>
            <DeveloperSubmitApp />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when pendingRevisions = false', () => {
    window.reapit.config.appEnv = 'development'
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.REGISTER, key: 'registerRoute' }]}>
            <DeveloperSubmitApp />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('renderErrors', () => {
    it('should return null is error object is empty', () => {
      const result = renderErrors({})
      expect(result).toBeNull()
    })
    it('should errors correctly and not render FIELD_ERROR_DESCRIPTION', () => {
      const Component = () =>
        renderErrors({
          name: 'test',
          telephone: 'test',
          homePage: ['test', 'test'],
          unknownField: 'test',
        })

      const wrapper = mount(<Component />)

      const fieldUnknownNode = wrapper.find('[data-test="unknownField"]')
      expect(fieldUnknownNode.text()).toBe('unknownField: test')

      const fieldHomePageNode = wrapper.find('[data-test="homePage"]')
      expect(fieldHomePageNode.text()).toBe(`${labelTextOfField['homePage']}: test, test`)

      const fieldNameNode = wrapper.find('[data-test="name"]')
      expect(fieldNameNode.text()).toBe(`${labelTextOfField['name']}: test`)

      const fieldTelephoneNode = wrapper.find('[data-test="telephone"]')
      expect(fieldTelephoneNode.text()).toBe(`${labelTextOfField['telephone']}: test`)

      const headingNode = wrapper.find('h6')
      expect(headingNode.text()).toBe('The following validation errors have occurred:')
    })
    it('should render field render FIELD_ERROR_DESCRIPTION correctly', () => {
      const Component = () =>
        renderErrors({
          [FIELD_ERROR_DESCRIPTION]: 'test-heading',
        })

      const wrapper = mount(<Component />)
      const headingNode = wrapper.find('h6')
      expect(headingNode.text()).toBe('test-heading')
    })
  })

  describe('handleSubmitApp', () => {
    const appModel = { redirectUris: '' } as CreateAppModel
    afterEach(() => jest.clearAllMocks())
    it('should call submitRevision when have appId', () => {
      const onSuccess = jest.fn()
      const onError = jest.fn()
      const fn = handleSubmitApp({
        appId: 'testAppId',
        dispatch: spyDispatch,
        setSubmitting: jest.fn(),
        onSuccess: onSuccess,
        onError: onError,
      })
      fn(appModel)
      expect(spyDispatch).toBeCalledWith(
        submitRevision({
          params: {
            redirectUris: [],
            signoutUris: [],
            id: 'testAppId',
          },
          onSuccess: onSuccess,
          onError: onError,
        }),
      )
    })
  })

  describe('handleGoBackToApps', () => {
    it('should run correctly', () => {
      const fn = handleGoBackToApps(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.APPS)
    })
  })
  describe('handleOnSubmitAnotherApp', () => {
    it('should run correctly', () => {
      const fn = handleOnSubmitAnotherApp(spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(submitAppSetFormState('PENDING'))
    })
  })
  describe('generateInitialValues', () => {
    it('should run correctly in case appDetail is null', () => {
      const result = generateInitialValues(null, 'testid')
      expect(result).toEqual({
        categoryId: '',
        authFlow: '',
        screen5ImageUrl: '',
        screen4ImageUrl: '',
        screen3ImageUrl: '',
        screen2ImageUrl: '',
        screen1ImageUrl: '',
        name: '',
        telephone: '',
        supportEmail: '',
        launchUri: '',
        iconImageUrl: '',
        homePage: '',
        description: '',
        summary: '',
        developerId: 'testid',
        scopes: [],
        redirectUris: '',
        signoutUris: '',
        limitToClientIds: '',
        desktopIntegrationTypeIds: '',
      })
    })
    it('should run correctly in case appDetail is existed', () => {
      const result = generateInitialValues(appDetailDataStub.data, 'testid')
      expect(result).toEqual({
        authFlow: undefined,
        categoryId: '',
        description: 'enim facilisis',
        desktopIntegrationTypeIds: [],
        developerId: undefined,
        homePage: 'http://myawesomeproptechproduct.io',
        iconImageUrl: '',
        isDirectApi: undefined,
        isListed: undefined,
        isPrivateApp: 'no',
        launchUri: undefined,
        limitToClientIds: '',
        name: "Peter's Properties",
        redirectUris: '',
        scopes: ['Marketplace/developers.read', 'Marketplace/developers.write'],
        screen1ImageUrl:
          'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/c4a36706-aa44-47f9-9fb6-9053eef4e581.png',
        screen2ImageUrl:
          'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/65bd3b97-e78c-41cd-b75f-e06e1d2f00df.png',
        signoutUris: '',
        summary: 'vitae elementum curabitur vitae',
        supportEmail: 'support@reapit.com',
        telephone: '0113 288 2900',
      })
    })
  })

  describe('handleOpenAppPreview', () => {
    it('should run correctly', () => {
      const params = { appDetails: {}, values: {}, scopes: [], categories: [], appId: 'appId' }
      const spyLocalStorageSetItem = jest.spyOn(window.localStorage, 'setItem')
      const spyOpenUrl = jest.spyOn(window, 'open')
      const expected = JSON.stringify({ scopes: [], media: [] })

      const fn = handleOpenAppPreview(params)
      fn()
      expect(spyLocalStorageSetItem).toBeCalledWith('developer-preview-app', expected)
      expect(spyOpenUrl).toBeCalledWith('/apps/appId/preview', '_blank')
    })
  })

  describe('handleSubmitAppSuccess', () => {
    const setSubmitting = jest.fn()
    const { history } = getMockRouterProps({})
    const fn = handleSubmitAppSuccess(setSubmitting, history)
    fn()
    expect(setSubmitting).toBeCalled()
    expect(history.push).toBeCalledWith(Routes.APPS)
  })

  describe('handleSubmitAppError', () => {
    const setSubmitting = jest.fn()
    const fn = handleSubmitAppError(setSubmitting)
    fn()
    expect(setSubmitting).toBeCalled()
    expect(setSubmitting).toBeCalledWith(false)
  })

  describe('sanitizeAppData', () => {
    it('should run correctly', () => {
      const input = {
        description: '',
        developerId: '7a96e6b2-3778-4118-9c9b-6450851e5608',
        homePage: '',
        telephone: '',
        supportEmail: '',
        summary: '',
        launchUri: '',
        isListed: false,
        isDirectApi: false,
        scopes: ['agencyCloud/applicants.read'],
        isPrivateApp: 'no',
        desktopIntegrationTypeIds: [],
        redirectUris: ['http://localhost:8080'],
        signoutUris: ['http://localhost:8080/login'],
        limitToClientIds: [],
        iconImageUrl: '',
        name: 'Test new App',
      }
      const output = {
        developerId: '7a96e6b2-3778-4118-9c9b-6450851e5608',
        isListed: false,
        isDirectApi: false,
        scopes: ['agencyCloud/applicants.read'],
        isPrivateApp: 'no',
        desktopIntegrationTypeIds: [],
        redirectUris: ['http://localhost:8080'],
        signoutUris: ['http://localhost:8080/login'],
        limitToClientIds: [],
        name: 'Test new App',
        iconImageUrl: '',
      }
      const result = sanitizeAppData(input)
      expect(result).toEqual(output)
    })
  })
})
