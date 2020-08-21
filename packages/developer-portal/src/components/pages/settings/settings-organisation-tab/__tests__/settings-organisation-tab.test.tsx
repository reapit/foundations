import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import appState from '@/reducers/__stubs__/app-state'
import DeveloperOrganisationTabPage, { handleToggleVisibleModal } from '../settings-organisation-tab'

jest.mock('react-router-dom', () => {
  return {
    useRouteMatch: jest.fn(() => {
      return {
        url: '123',
      }
    }),
    useHistory: jest.fn(),
  }
})

describe('DeveloperOrganisationTabPage', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('DeveloperSettingsOrganisationTabPage', () => {
    it('should match snapshot', () => {
      const wrapper = mount(
        <Provider store={store}>
          <DeveloperOrganisationTabPage />
        </Provider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})

describe('handleToggleVisibleModal', () => {
  it('should call with correct params true', () => {
    const setIsInviteModalOpen = jest.fn()
    const fn = handleToggleVisibleModal(setIsInviteModalOpen, true)
    fn()
    expect(setIsInviteModalOpen).toHaveBeenCalledWith(true)
  })

  it('should call with correct params true', () => {
    const setIsInviteModalOpen = jest.fn()
    const fn = handleToggleVisibleModal(setIsInviteModalOpen, false)
    fn()
    expect(setIsInviteModalOpen).toHaveBeenCalledWith(false)
  })
})
