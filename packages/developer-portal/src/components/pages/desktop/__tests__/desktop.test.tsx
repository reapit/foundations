import * as React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { DeveloperDesktopPage, handleSetSubscribingState, handleToggleModal } from '../desktop'
import { render } from '../../../../tests/react-testing'

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
    const wrapper = render(
      <Provider store={store}>
        <DeveloperDesktopPage />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSetSubscribingState', () => {
  it('should run correctly', () => {
    const setIsDeveloperEditionModalOpen = jest.fn()
    handleSetSubscribingState(setIsDeveloperEditionModalOpen, 'CONFIRMING')()
    expect(setIsDeveloperEditionModalOpen).toBeCalledWith('CONFIRMING')
  })
})

describe('handleToggleModal', () => {
  it('should correctly set state', () => {
    const setModalVisible = jest.fn()
    handleToggleModal(setModalVisible, true)()
    expect(setModalVisible).toBeCalledWith(false)
  })
})
