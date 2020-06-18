import * as React from 'react'
import { mount, shallow } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import DeveloperConfirmSubscription from '../developer-confirm-subscription'
import { Provider, useSelector } from 'react-redux'
import configureStore from 'redux-mock-store'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectCreatedDeveloperSubscription,
} from '@/selector/developer-subscriptions'
import { developerStub } from '@/sagas/__stubs__/developer'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => jest.fn()),
}))

describe('DeveloperConfirmSubscription', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when visible', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DeveloperConfirmSubscription developer={developerStub} visible={true} afterClose={jest.fn()} />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when not visible', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DeveloperConfirmSubscription developer={developerStub} visible={false} afterClose={jest.fn()} />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should call hooks with correct params', () => {
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.loginSession?.loginIdentity)

    mount(
      <Provider store={store}>
        <DeveloperConfirmSubscription developer={developerStub} visible={true} afterClose={jest.fn()} />
      </Provider>,
    )

    expect(useSelector).toHaveBeenCalledWith(selectCreateDeveloperSubscriptionLoading)
    expect(useSelector).toHaveBeenCalledWith(selectCreatedDeveloperSubscription)
  })
})
