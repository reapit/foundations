import React from 'react'
import { fetcher } from '@reapit/elements'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import EditOfficeGroupModal, { UpdateOfficeGroupModalProps, onHandleSubmit } from '../edit-office-group'
import { data } from '../__stubs__/office-groups'

jest.mock('@reapit/elements')
jest.mock('../../../../core/connect-session')
const mockedFetch = fetcher as jest.Mock

const filterProps = (): UpdateOfficeGroupModalProps => ({
  editingGroup: { id: 'GR1', name: 'Group Name', officeIds: 'OF1, OF2' },
  setEditingGroup: jest.fn,
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn,
  offices: data,
})

jest.mock('../../../../core/connect-session')

const mockResponse = 'success'

describe('EditOfficeGroupModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<EditOfficeGroupModal {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const name = 'Group name'
  const handleOnClose = jest.fn()
  const onRefetchData = jest.fn()
  const orgId = 'ORG1'
  const editingGroup = { id: 'GR01', status: 'active' }
  const officeIds = ['OF1', 'OF2']
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, editingGroup, orgId)

  it('should return a function when executing', async () => {
    mockedFetch.mockReturnValueOnce(undefined)
    jest.spyOn(notification, 'error')
    await onSubmit({ name, officeIds, status: true })

    expect(notification.error).toHaveBeenCalled()
  })

  it('should return a function when executing', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    jest.spyOn(notification, 'success')
    await onSubmit({ name, officeIds, status: true })

    expect(notification.success).toHaveBeenCalled()
  })
})
