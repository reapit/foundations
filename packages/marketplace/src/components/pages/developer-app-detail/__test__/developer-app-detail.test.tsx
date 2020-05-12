import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import DeveloperAppDetail, { handleOnDeleteAppSuccess } from '../developer-app-detail'
import routes from '@/constants/routes'

const mockState = {
  developer: {
    developerAppDetail: {
      data: appDetailDataStub.data,
      isAppDetailLoading: false,
    },
  },
  auth: {
    loginType: 'CLIENT',
  },
} as ReduxState

describe('DeveloperAppDetail', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <DeveloperAppDetail />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleOnDeleteAppSuccess', () => {
    const history = {
      replace: jest.fn(),
    }
    const fn = handleOnDeleteAppSuccess(history)
    fn()
    expect(history.replace).toBeCalledWith(routes.DEVELOPER_MY_APPS)
  })
})
