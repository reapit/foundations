import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { CreateSubscriptionsButton, CreateSubscriptionsButtonProps } from '../create-subscriptions'
import appState from '../../../reducers/__stubs__/app-state'
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
      render(
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
