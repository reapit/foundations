import * as React from 'react'
import { mount } from 'enzyme'
import { CreateSubscriptionsButton, CreateSubscriptionsButtonProps } from '../create-subscriptions-button'
import appState from '../../../../reducers/__stubs__/app-state'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'

const props: CreateSubscriptionsButtonProps = {
  subscriptionType: 'applicationListing',
  developerId: 'DEVELOPER_ID',
  appId: 'APP_ID',
}

describe('CreateSubscriptionsButton', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <CreateSubscriptionsButton {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
