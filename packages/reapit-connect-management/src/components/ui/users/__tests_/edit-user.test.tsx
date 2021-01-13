import React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import UpdateUserModal, { UpdateUserModalProps, onHandleSubmit } from '../edit-user'
import { updateUser } from '../../../../services/user'
import { data } from '../__stubs__/user-groups'

const filterProps = (): UpdateUserModalProps => ({
  editingUser: { id: 'GR1', name: 'User Name', groups: ['OF1', 'OF2'] },
  setEditingUser: jest.fn,
  onRefetchData: jest.fn,
})

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')

jest.spyOn(notification, 'error')
jest.spyOn(notification, 'success')
jest.mock('swr', () =>
  jest.fn(() => ({
    data,
  })),
)
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
    await onSubmit({ name, groupIds })
    expect(notification.success).toHaveBeenCalled()
    expect(notification.error).not.toHaveBeenCalled()
  })

  it('should show notification success', async () => {
    ;(updateUser as jest.Mock).mockReturnValueOnce(false)
    await onSubmit({ name, groupIds })
    expect(notification.success).not.toHaveBeenCalled()
    expect(notification.error).toHaveBeenCalled()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
