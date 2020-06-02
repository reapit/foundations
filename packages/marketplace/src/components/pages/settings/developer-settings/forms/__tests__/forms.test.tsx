import React from 'react'
import { Dispatch } from 'redux'
import { createDispatchers, Forms } from '../forms'
import { developerStub } from '@/sagas/__stubs__/developer'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import {
  updateDeveloperData as updateDeveloperDataAction,
  changePassword as changePasswordAction,
} from '@/actions/settings'
import { authLogout } from '@/actions/auth'

describe('ProfileTab', () => {
  const mockStore = configureStore()

  const mockState = {
    settings: {
      loading: true,
      developerInfomation: developerStub,
    },
    auth: {
      loginSession: {
        loginIdentity: {
          email: developerStub.email,
        },
      },
    },
  } as ReduxState

  const store = mockStore(mockState)
  it('should match snapshot', () => {
    expect(
      mount(
        <Provider store={store}>
          <Forms />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  test('createDispatchers - should return correctly', () => {
    const mockDispatch = jest.fn()
    const { changePassword, logout, updateDeveloperInformation } = createDispatchers(mockDispatch as Dispatch)

    const mockChangePasswordParam = {
      currentPassword: 'a',
      password: 'a',
      confirmPassword: 'a',
    }
    changePassword(mockChangePasswordParam)
    expect(mockDispatch).toHaveBeenCalledWith(changePasswordAction(mockChangePasswordParam))

    logout()
    expect(mockDispatch).toHaveBeenCalledWith(authLogout())

    const mockUpdateDeveloperInformationParam = {
      companyName: 'a',
      name: 'a',
      jobTitle: 'a',
      telephone: 'a',
    }
    updateDeveloperInformation(mockUpdateDeveloperInformationParam)
    expect(mockDispatch).toHaveBeenCalledWith(updateDeveloperDataAction(mockUpdateDeveloperInformationParam))
  })
})
