import React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import EditOfficeGroupModal, { UpdateOfficeGroupModalProps, onHandleSubmit } from '../edit-office-group'
import { data } from '../__stubs__/office-groups'

const filterProps = (): UpdateOfficeGroupModalProps => ({
  editingGroup: { id: 'GR1', name: 'Group Name', officeIds: 'OF1, OF2' },
  setEditingGroup: jest.fn,
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn,
})

jest.mock('../../../../core/connect-session')
jest.mock('swr', () =>
  jest.fn(() => ({
    data,
    mutate: jest.fn,
  })),
)

const mockResponse = 'success'

const mockFetchPromise = Promise.resolve({
  json: () => mockResponse,
})

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
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
    jest.spyOn(notification, 'error')
    await onSubmit({ name, officeIds })

    expect(notification.error).toHaveBeenCalled()
  })

  it('should return a function when executing', async () => {
    window.fetch = jest.fn().mockImplementation(() => undefined as any)
    jest.spyOn(notification, 'success')
    await onSubmit({ name, officeIds })

    expect(notification.success).toHaveBeenCalled()
  })
})
