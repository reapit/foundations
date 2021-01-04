import React from 'react'
import { shallow } from 'enzyme'
import UpdateUserModal, { UpdateUserModalProps } from '../edit-user'

const filterProps = (): UpdateUserModalProps => ({
  editingUser: { id: 'GR1', name: 'User Name', groups: ['OF1', 'OF2'] },
  setEditingUser: jest.fn,
  onRefetchData: jest.fn,
})

describe('UpdateUserModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UpdateUserModal {...filterProps()} />)).toMatchSnapshot()
  })
})
