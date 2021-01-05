import React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import CreateOfficeGroupModal, { CreateOfficeGroupModalProps, onHandleSubmit } from '../create-office-group'

const filterProps = (): CreateOfficeGroupModalProps => ({
  visible: true,
  setOpenCreateGroupModal: jest.fn(),
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn(),
})

jest.mock('../../../../core/connect-session')
const mockResponse = 'success'

const mockFetchPromise = Promise.resolve({
  json: () => mockResponse,
})

describe('CreateOfficeGroupModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CreateOfficeGroupModal {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const name = 'Group name'
  const handleOnClose = jest.fn()
  const onRefetchData = jest.fn()
  const orgId = 'ORG1'
  const officeIds = ['OF1', 'OF2']
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, orgId)

  it('should show notification error', async () => {
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
    jest.spyOn(notification, 'error')
    await onSubmit({ name, officeIds })

    expect(notification.error).toHaveBeenCalled()
  })

  it('should show notification success', async () => {
    window.fetch = jest.fn().mockImplementation(() => undefined as any)
    jest.spyOn(notification, 'success')
    await onSubmit({ name, officeIds })

    expect(notification.success).toHaveBeenCalled()
  })
})
