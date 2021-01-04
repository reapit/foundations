import React from 'react'
import { shallow } from 'enzyme'
import EditOfficeGroupModal, { UpdateOfficeGroupModalProps } from '../edit-office-group'

const filterProps = (): UpdateOfficeGroupModalProps => ({
  editingGroup: { id: 'GR1', name: 'Group Name', officeIds: 'OF1, OF2' },
  setEditingGroup: jest.fn,
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn,
})

describe('EditOfficeGroupModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<EditOfficeGroupModal {...filterProps()} />)).toMatchSnapshot()
  })
})
