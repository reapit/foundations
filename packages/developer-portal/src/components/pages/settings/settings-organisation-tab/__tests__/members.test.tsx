import React from 'react'
import { Members, CellName, closeSetMemberStatusModal, openSetMemberStatusModal } from '../members'
import { shallow } from 'enzyme'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('Members', () => {
  test('CellName should match snapshots', () => {
    expect(
      shallow(
        <CellName
          row={{
            original: {
              email: '',
              title: '',
            },
          }}
        />,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when no error', () => {
    expect(shallow(<Members />)).toMatchSnapshot()
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
