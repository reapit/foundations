import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import MockDate from 'mockdate'
import DeveloperSubmitApp, {
  labelTextOfField,
  renderErrors,
  handleSubmitApp,
  handleClickOpenModal,
  handleCloseModal,
  handleSubmitModalViewDocs,
  handleBeforeSubmit,
  handleAcceptTerms,
  handleDeclineTerms,
  handleSubmitModalContinue,
  handleGoBackToApps,
  handleOnSubmitAnotherApp,
  generateInitialValues,
  handleOpenAppPreview,
} from '../developer-submit-app'
import { getMockRouterProps } from '@/utils/mock-helper'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
import { CustomCreateAppModel, submitApp, SubmitAppFormikActions, submitAppSetFormState } from '@/actions/submit-app'
import { CreateAppModel } from '@/types/marketplace-api-schema'
import { submitRevision } from '@/actions/submit-revision'
import DOCS_LINKS from '@/constants/docs-links'
import { getCookieString, setCookieString, COOKIE_FIRST_SUBMIT, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
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
  it('should match a snapshot', () => {
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
    const actions = {} as SubmitAppFormikActions
    afterEach(() => jest.clearAllMocks())
    it('should call submitApp when dont have appId', () => {
      const fn = handleSubmitApp('', spyDispatch)
      fn(appModel, actions)
      expect(spyDispatch).toBeCalledWith(
        submitApp({
          redirectUris: [],
          signoutUris: [],
          actions,
        }),
      )
    })
    it('should call submitRevision when have appId', () => {
      const fn = handleSubmitApp('testAppId', spyDispatch)
      fn(appModel, actions)
      expect(spyDispatch).toBeCalledWith(
        submitRevision({
          redirectUris: [],
          signoutUris: [],
          id: 'testAppId',
        }),
      )
    })
  })

  describe('handleClickOpenModal', () => {
    it('should call preventDefault and setTermModalIsOpen', () => {
      const eventMock = {
        preventDefault: jest.fn(),
      }
      const setTermModalIsOpen = jest.fn()
      const spy = jest.spyOn(eventMock, 'preventDefault')
      handleClickOpenModal(setTermModalIsOpen)(eventMock)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(setTermModalIsOpen).toHaveBeenCalledWith(true)
    })
  })
  describe('handleCloseModal', () => {
    it('should call setTermModalIsOpen', () => {
      const setTermModalIsOpen = jest.fn()
      handleCloseModal(setTermModalIsOpen)()
      expect(setTermModalIsOpen).toHaveBeenCalledWith(false)
    })
  })

  describe('handleSubmitModalContinue', () => {
    const mockDateString = '2020-02-18'

    beforeAll(() => {
      MockDate.set(new Date(mockDateString))
    })
    afterAll(() => {
      MockDate.reset()
    })
    it('should call setIsSubmitModalOpen & setCookieString', () => {
      const setIsSubmitModalOpen = jest.fn()
      const fn = handleSubmitModalContinue(setIsSubmitModalOpen)
      fn()
      expect(setIsSubmitModalOpen).toHaveBeenCalledWith(false)
      expect(setCookieString).toHaveBeenCalledWith(COOKIE_FIRST_SUBMIT, mockDateString, COOKIE_MAX_AGE_INFINITY)
    })
  })

  describe('handleSubmitModalViewDocs', () => {
    const { location } = window

    beforeAll(() => {
      delete window.location
      window.location = { assign: jest.fn() } as any
    })

    afterAll(() => {
      window.location = location
    })
    it('should call window.location.assign', () => {
      const spy = jest.spyOn(window, 'open')
      handleSubmitModalViewDocs()
      expect(spy).toHaveBeenCalledWith(DOCS_LINKS.DEVELOPER_PORTAL, '_blank')
    })
  })

  describe('handleBeforeSubmit', () => {
    it('should call setIsSubmitModalOpen when !firstSubmitCookie', () => {
      ;(getCookieString as any).mockImplementation(() => null)
      const validateFunction = jest.fn()
      const setIsSubmitModalOpen = jest.fn()
      const fn = handleBeforeSubmit(validateFunction, setIsSubmitModalOpen)
      const result = fn({ key: 'val' } as CustomCreateAppModel)
      expect(result).toEqual({ message: 'firstSubmit' })
    })
    it('should return validateFunc when firstSubmitCookie', () => {
      ;(getCookieString as any).mockImplementation(() => '2020-01-01')
      const validateFunction = jest.fn()
      const setIsSubmitModalOpen = jest.fn()
      const fn = handleBeforeSubmit(validateFunction, setIsSubmitModalOpen)
      const result = fn({ key: 'val' } as CustomCreateAppModel)
      expect(result).toEqual(validateFunction({ key: 'val' }))
    })
  })

  describe('handleAcceptTerms', () => {
    it('should call setIsAgreedTerms and setTermModalIsOpen', () => {
      const setTermModalIsOpen = jest.fn()
      const setIsAgreedTerms = jest.fn()
      handleAcceptTerms(setIsAgreedTerms, setTermModalIsOpen)()
      expect(setIsAgreedTerms).toHaveBeenCalledWith(true)
      expect(setTermModalIsOpen).toHaveBeenCalledWith(false)
    })
  })
  describe('handleDeclineTerms', () => {
    it('should call preventDefault and setTermModalIsOpen', () => {
      const setTermModalIsOpen = jest.fn()
      const setIsAgreedTerms = jest.fn()
      handleDeclineTerms(setIsAgreedTerms, setTermModalIsOpen)()
      expect(setIsAgreedTerms).toHaveBeenCalledWith(false)
      expect(setTermModalIsOpen).toHaveBeenCalledWith(false)
    })
  })
  describe('handleGoBackToApps', () => {
    it('should run correctly', () => {
      const fn = handleGoBackToApps(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.DEVELOPER_MY_APPS)
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
      expect(spyOpenUrl).toBeCalledWith('developer/apps/appId/preview', '_blank')
    })
  })
})
