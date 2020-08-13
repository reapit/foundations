import React from 'react'
import { Dispatch } from 'redux'
import { createDispatchers, Forms } from '../forms'
import { developerStub } from '@/sagas/__stubs__/developer'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { changePassword as changePasswordAction } from '@/actions/settings'
import appState from '@/reducers/__stubs__/app-state'

describe('ProfileTab', () => {
  const mockStore = configureStore()

  const mockState = {
    ...appState,
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
    const { changePassword, logout } = createDispatchers(mockDispatch as Dispatch)

    const mockChangePasswordParam = {
      currentPassword: 'a',
      password: 'a',
      confirmPassword: 'a',
    }
    changePassword(mockChangePasswordParam)
    expect(mockDispatch).toHaveBeenCalledWith(changePasswordAction(mockChangePasswordParam))

    logout()
  })
})
