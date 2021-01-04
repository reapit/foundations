import React from 'react'
import { shallow } from 'enzyme'
import CreateOfficeGroupModal, { CreateOfficeGroupModalProps } from '../create-office-group'

const filterProps = (): CreateOfficeGroupModalProps => ({
  visible: true,
  setOpenCreateGroupModal: jest.fn,
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn,
})

describe('CreateOfficeGroupModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CreateOfficeGroupModal {...filterProps()} />)).toMatchSnapshot()
  })
})
