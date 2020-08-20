import React from 'react'
import { Members, closeDisableMemberModal, openDisableMemberModal } from '../members'
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

  describe('openDisableMemberModal', () => {
    it('should run correctly', () => {
      const user = developerStub
      const setSelectedUser = jest.fn()
      const setDisableMemberModalVisible = jest.fn()
      openDisableMemberModal(setSelectedUser, setDisableMemberModalVisible, user)()
      expect(setDisableMemberModalVisible).toBeCalled()
      expect(setSelectedUser).toBeCalled()
      expect(setDisableMemberModalVisible).toBeCalledWith(true)
      expect(setSelectedUser).toBeCalledWith(user)
    })
  })

  describe('closeDisableMemberModal', () => {
    it('should run correctly', () => {
      const setDisableMemberModalVisible = jest.fn()
      closeDisableMemberModal(setDisableMemberModalVisible)()
      expect(setDisableMemberModalVisible).toBeCalled()
      expect(setDisableMemberModalVisible).toBeCalledWith(false)
    })
  })
})
