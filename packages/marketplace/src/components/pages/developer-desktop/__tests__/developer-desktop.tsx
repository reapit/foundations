import * as React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import {
  DeveloperDesktopPage,
  confirmSubscription,
  handleToggleVisibleModal,
  handleCloseConfirmSubscriptionModal,
} from '../developer-desktop'

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

describe('handleCloseConfirmSubscriptionModal', () => {
  it('should run correctly', () => {
    const setConfirmSubscriptionModalOpen = jest.fn()
    const setSelectedDevelopers = jest.fn()
    handleCloseConfirmSubscriptionModal(setSelectedDevelopers, setConfirmSubscriptionModalOpen)()
    expect(setSelectedDevelopers).toBeCalled()
    expect(setConfirmSubscriptionModalOpen).toBeCalled()
  })
})
