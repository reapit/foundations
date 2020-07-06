import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { DeveloperDesktopPage, handleToggleVisibleModal } from '../developer-desktop'

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
    const wrapper = mount(
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
