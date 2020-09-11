import React from 'react'
import {
  Members,
  closeDisableMemberModal,
  openDisableMemberModal,
  openReinviteModal,
  closeReinviteModal,
  handleGenerateUniqueDataList,
} from '../members'
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
  describe('openReinviteModal', () => {
    it('should run correctly', () => {
      const setSelectedUser = jest.fn()
      const setModalOpen = jest.fn()
      const user = {}
      openReinviteModal(setSelectedUser, setModalOpen, user)()
      expect(setModalOpen).toBeCalledWith(true)
      expect(setSelectedUser).toBeCalledWith(user)
    })
  })

  describe('closeReinviteModal', () => {
    it('should run correctly', () => {
      const setModalOpen = jest.fn()
      closeReinviteModal(setModalOpen)()
      expect(setModalOpen).toBeCalledWith(false)
    })
  })
})

describe('handleGenerateUniqueDataList', () => {
  it('should run correctly with pending', () => {
    const data = [
      {
        id: '879551ef-1127-4088-a0cb-40a7a0df188b',
        created: '2020-09-09T10:26:10',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engineer',
        status: 'pending',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
      {
        id: 'd42b6362-dbf2-4250-93e1-1e63ee2ebcda',
        created: '2020-09-09T10:26:36',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engin',
        status: 'pending',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
    ]
    const fn = handleGenerateUniqueDataList(data)
    const result = fn()
    const expected = [
      {
        id: 'd42b6362-dbf2-4250-93e1-1e63ee2ebcda',
        created: '2020-09-09T10:26:36',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engin',
        status: 'pending',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
    ]
    expect(result).toEqual(expected)
  })

  it('should run correctly with active & pending', () => {
    const data = [
      {
        id: '879551ef-1127-4088-a0cb-40a7a0df188b',
        created: '2020-09-09T10:26:10',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engineer',
        status: 'pending',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
      {
        id: 'd42b6362-dbf2-4250-93e1-1e63ee2ebcda',
        created: '2020-09-09T10:26:36',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engin',
        status: 'active',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
    ]
    const fn = handleGenerateUniqueDataList(data)
    const result = fn()
    const expected = [
      {
        id: 'd42b6362-dbf2-4250-93e1-1e63ee2ebcda',
        created: '2020-09-09T10:26:36',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engin',
        status: 'active',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
    ]
    expect(result).toEqual(expected)
  })

  it('should run correctly with active & pending & inactive', () => {
    const data = [
      {
        id: '879551ef-1127-4088-a0cb-40a7a0df188b',
        created: '2020-09-09T10:26:10',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engineer',
        status: 'pending',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
      {
        id: 'd42b6362-dbf2-4250-93e1-1e63ee2ebcda',
        created: '2020-09-09T10:26:36',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engin',
        status: 'active',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
      {
        id: 'd42b6362-dbf2-4250-93e1-1e63ee2ebcda',
        created: '2020-09-09T10:24:36',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engin',
        status: 'inactive',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
    ]
    const fn = handleGenerateUniqueDataList(data)
    const result = fn()
    const expected = [
      {
        id: 'd42b6362-dbf2-4250-93e1-1e63ee2ebcda',
        created: '2020-09-09T10:26:36',
        email: 'cuongvh@dwarvesv.com',
        name: 'cuong',
        jobTitle: 'Engin',
        status: 'active',
        role: 'user',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        agencyCloudAccess: false,
      },
    ]
    expect(result).toEqual(expected)
  })
})
