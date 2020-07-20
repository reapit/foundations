import React from 'react'
import { Members, closeSetMemberStatusModal, openSetMemberStatusModal } from '../members'
import { developerStub } from '@/sagas/__stubs__/developer'
import * as ReactRedux from 'react-redux'
import appState from '@/reducers/__stubs__/app-state'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

describe('Members', () => {
  const mockStore = configureStore()
  const store = mockStore(appState)
  it('should match a snapshot when no error', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Members />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('openSetMemberStatusModal', () => {
    it('should run correctly', () => {
      const user = developerStub
      const setSelectedUser = jest.fn()
      const setEditStatusModalVisible = jest.fn()
      openSetMemberStatusModal(setSelectedUser, setEditStatusModalVisible, user)()
      expect(setEditStatusModalVisible).toBeCalled()
      expect(setSelectedUser).toBeCalled()
      expect(setEditStatusModalVisible).toBeCalledWith(true)
      expect(setSelectedUser).toBeCalledWith(user)
    })
  })

  describe('closeSetMemberStatusModal', () => {
    it('should run correctly', () => {
      const setEditStatusModalVisible = jest.fn()
      closeSetMemberStatusModal(setEditStatusModalVisible)()
      expect(setEditStatusModalVisible).toBeCalled()
      expect(setEditStatusModalVisible).toBeCalledWith(false)
    })
  })
})
