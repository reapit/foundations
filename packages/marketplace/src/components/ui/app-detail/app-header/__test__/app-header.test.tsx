import * as React from 'react'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import AppHeader, { AppHeaderProps } from '../app-header'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
const mockProps: AppHeaderProps = {
  appDetailData: {
    ...appDetailDataStub.data,
    apiKey: '',
  },
}

describe('AppContent', () => {
  it('should match a snapshot', () => {
    const mockState = {
      client: {
        webComponent: {
          loading: false,
          updating: false,
          data: null,
          isShowModal: true,
        },
      },
    } as ReduxState
    const mockStore = configureStore()
    const store = mockStore(mockState)
    expect(
      mount(
        <Provider store={store}>
          <AppHeader {...mockProps} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
})
