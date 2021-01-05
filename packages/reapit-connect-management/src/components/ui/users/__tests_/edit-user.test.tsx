import React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import UpdateUserModal, { UpdateUserModalProps, onHandleSubmit } from '../edit-user'

const filterProps = (): UpdateUserModalProps => ({
  editingUser: { id: 'GR1', name: 'User Name', groups: ['OF1', 'OF2'] },
  setEditingUser: jest.fn,
  onRefetchData: jest.fn,
})

jest.mock('../../../../core/connect-session')
const mockResponse = 'success'

const mockFetchPromise = Promise.resolve({
  json: () => mockResponse,
})

describe('UpdateUserModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UpdateUserModal {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const name = 'Group name'
  const handleOnClose = jest.fn()
  const onRefetchData = jest.fn()
  const groupIds = ['OF1', ' OF2']
  const editingUser = { name: 'User Name', groupIds }
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, editingUser)

  it('should show notification error', async () => {
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
    jest.spyOn(notification, 'error')
    await onSubmit({ name, groupIds })

    expect(notification.error).toHaveBeenCalled()
  })

  it('should show notification success', async () => {
    window.fetch = jest.fn().mockImplementation(() => undefined as any)
    jest.spyOn(notification, 'success')
    await onSubmit({ name, groupIds })

    expect(notification.success).toHaveBeenCalled()
  })
})
