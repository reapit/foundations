import * as React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import {
  DeveloperDesktopPage,
  confirmSubscription,
  handleToggleVisibleModal,
  handleCreateSubscription,
} from '../developer-desktop'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('DeveloperDesktopPage', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DeveloperDesktopPage />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleToggleVisibleModal', () => {
  it('should run correctly', () => {
    const setIsDeveloperEditionModalOpen = jest.fn()
    const isVisible = false
    handleToggleVisibleModal(setIsDeveloperEditionModalOpen, isVisible)()
    expect(setIsDeveloperEditionModalOpen).toBeCalledWith(isVisible)
  })
})

describe('confirmSubscription', () => {
  jest.useFakeTimers()

  it('should run correctly', () => {
    const setIsDeveloperEditionModalOpen = jest.fn()
    const setConfirmSubscriptionModalOpen = jest.fn()
    const setSelectedDevelopers = jest.fn()
    const values = []
    confirmSubscription(setIsDeveloperEditionModalOpen, setConfirmSubscriptionModalOpen, setSelectedDevelopers)(values)
    jest.runAllTimers()

    expect(setIsDeveloperEditionModalOpen).toBeCalled()
    expect(setConfirmSubscriptionModalOpen).toBeCalled()
    expect(setSelectedDevelopers).toBeCalled()
    expect(setSelectedDevelopers).toBeCalledWith(values)
  })
})

describe('handleCreateSubscription', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const setConfirmSubscriptionModalOpen = jest.fn()
    const setSelectedDevelopers = jest.fn()
    const developer = developerStub
    handleCreateSubscription(dispatch, setConfirmSubscriptionModalOpen, setSelectedDevelopers)(developer)
    expect(dispatch).toBeCalled()
  })
})
