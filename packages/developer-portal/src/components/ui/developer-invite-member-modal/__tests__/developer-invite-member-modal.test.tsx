import * as React from 'react'
import { mount, shallow } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { handleSubmit, InviteMemberModal, InviteMemberModalInput } from '../developer-invite-member-modal'
import { ReduxState } from '@/types/core'

const createStore = (loading: boolean, data?: string) => {
  return {
    ...appState,
    developers: {
      members: {
        inviteMember: {
          loading: loading,
          error: data,
        },
      },
    },
  } as ReduxState
}

describe('developer-invite-member-modal', () => {
  let store, mockStore
  beforeEach(() => {
    mockStore = configureStore()
  })
  describe('InviteMemberModal', () => {
    it('should match snapshot with default', () => {
      store = mockStore(createStore(false, ''))
      const wrapper = mount(
        <ReactRedux.Provider store={store}>
          <InviteMemberModal onClose={jest.fn()} />
        </ReactRedux.Provider>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot with loading true and error', () => {
      store = mockStore(createStore(true, 'Error'))
      const wrapper = mount(
        <ReactRedux.Provider store={store}>
          <InviteMemberModal onClose={jest.fn()} />
        </ReactRedux.Provider>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot with visible true', () => {
      store = mockStore(createStore(false, ''))
      const wrapper = mount(
        <ReactRedux.Provider store={store}>
          <InviteMemberModal visible={true} onClose={jest.fn()} />
        </ReactRedux.Provider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('InviteMemberModalInput', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<InviteMemberModalInput />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('handleSubmit', () => {
    it('should run correctly and call dispatch', () => {
      const mockDispatch = jest.fn()
      const mockOnClose = jest.fn()
      const developerId = 'mockDeveloperId'
      const fn = handleSubmit(mockDispatch, developerId, mockOnClose)
      fn({ name: '', email: '', message: '' })
      expect(mockDispatch).toBeCalled()
    })

    it('should run correctly and not call dispatch', () => {
      const mockDispatch = jest.fn()
      const mockOnClose = jest.fn()
      const developerId = ''
      const fn = handleSubmit(mockDispatch, developerId, mockOnClose)
      fn({ name: '', email: '', message: '' })
      expect(mockDispatch).not.toBeCalled()
    })
  })
})
