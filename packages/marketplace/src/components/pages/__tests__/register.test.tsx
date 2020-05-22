import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { Register, onSubmit, onRegisterButtonClick, onDeclineTermsAndConditions, onLoginButtonClick } from '../register'
import { developerCreate } from '@/actions/developer'
import { FormState, ReduxState } from '../../../types/core'
import { mockWithFormik } from '@/utils/mock-formik'
import { FormikProps, DATE_TIME_FORMAT } from '@reapit/elements'
import MockDate from 'mockdate'
import appState from '@/reducers/__stubs__/app-state'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { getMockRouterProps } from '@/utils/mock-helper'

const mockRegisterFormValues: CreateDeveloperModel = {
  name: 'test',
  companyName: 'test',
  email: 'test@email.com',
  telephone: '9991112311',
  agreedTerms: '',
}

describe('Register', () => {
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
            <Register />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('onSubmit', () => {
    beforeAll(() => {
      MockDate.set(new Date('2020-05-21'))
    })
    afterAll(() => {
      MockDate.reset()
    })
    it('should run correctly', () => {
      const fn = onSubmit(spyDispatch)
      fn(mockRegisterFormValues)
      expect(spyDispatch).toBeCalledWith(
        developerCreate({
          ...mockRegisterFormValues,
          agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
        }),
      )
    })
  })
  describe('onRegisterButtonClick', () => {
    it('should run correctly', () => {
      const mockValidateForm = jest.fn()
      const mockSetTermsAndConditionsModalVisible = jest.fn()
      const mockSetTouched = jest.fn()
      const fn = onRegisterButtonClick(
        mockValidateForm(mockRegisterFormValues),
        mockSetTermsAndConditionsModalVisible,
        mockSetTouched,
      )
      fn()
      expect(mockSetTouched).toBeCalledWith({
        companyName: true,
        email: true,
        name: true,
        telephone: true,
      })
    })
  })
  describe('onDeclineTermsAndConditions', () => {
    it('should run correctly', () => {
      const mockSetTermsAndConditionsModalVisible = jest.fn()
      const fn = onDeclineTermsAndConditions(mockSetTermsAndConditionsModalVisible)
      fn()
      expect(mockSetTermsAndConditionsModalVisible).toBeCalledWith(false)
    })
  })
  describe('onLoginButtonClick', () => {
    it('should run correctly', () => {
      const fn = onLoginButtonClick(history)
      fn()
      expect(history.replace).toBeCalledWith(`${Routes.DEVELOPER_LOGIN}`)
    })
  })
})
