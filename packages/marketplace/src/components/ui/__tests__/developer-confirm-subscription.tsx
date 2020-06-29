import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount, shallow } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import DeveloperConfirmSubscription, {
  handleAfterCloseModal,
  handleCreateSubscription,
} from '../developer-confirm-subscription'
import { Provider, useSelector } from 'react-redux'
import configureStore from 'redux-mock-store'
import { selectCreateDeveloperSubscriptionLoading } from '@/selector/developer-subscriptions'
import { developerStub } from '@/sagas/__stubs__/developer'
import { developerCreateSubscriptionClearError } from '@/actions/developer-subscriptions'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => jest.fn()),
}))

describe('DeveloperConfirmSubscription', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when visible', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DeveloperConfirmSubscription developer={developerStub} visible={true} onDone={jest.fn()} />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when not visible', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DeveloperConfirmSubscription developer={developerStub} visible={false} onDone={jest.fn()} />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should call hooks with correct params', () => {
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.loginSession?.loginIdentity)

    mount(
      <Provider store={store}>
        <DeveloperConfirmSubscription developer={developerStub} visible={true} onDone={jest.fn()} />
      </Provider>,
    )

    expect(useSelector).toHaveBeenCalledWith(selectCreateDeveloperSubscriptionLoading)
  })

  describe('handleAfterCloseModal', () => {
    it('should run correctly', () => {
      const setSuccess = jest.fn()
      const onDone = jest.fn()
      const fn = handleAfterCloseModal(onDone, spyDispatch, setSuccess)
      fn()
      expect(spyDispatch).toBeCalledWith(developerCreateSubscriptionClearError())
      expect(onDone).toBeCalled()
      expect(setSuccess).toBeCalled()
    })
  })

  describe('handleCreateSubscription', () => {
    it('should run correctly', () => {
      const setSuccess = jest.fn()
      const fn = handleCreateSubscription(spyDispatch, developerStub, setSuccess)
      fn()
      expect(spyDispatch).toBeCalled()
    })
  })
})
