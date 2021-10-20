import React from 'react'
import { fetcher } from '@reapit/utils-common'
import { shallow } from 'enzyme'
import OfficeGroupCreate, { OfficeGroupCreateProps, onHandleSubmit } from '../office-group-create'

const filterProps = (): OfficeGroupCreateProps => ({
  visible: true,
  setOpenCreateGroupModal: jest.fn(),
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn(),
})

jest.mock('@reapit/utils-common')
jest.mock('../../../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

jest.mock('../../../../utils/prepare-options')

jest.mock('formik', () => ({
  useFormikContext: jest.fn(() => ({ values: { officeIds: ['of01', 'of02'] } })),
}))

describe('OfficeGroupCreate', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficeGroupCreate {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const name = 'Group name'
  const status = 'active'
  const handleOnClose = jest.fn()
  const onRefetchData = jest.fn()
  const orgId = 'ORG1'
  const officeIds = ['OF1', 'OF2']
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, orgId)

  it('should show notification error', async () => {
    mockedFetch.mockReturnValueOnce(undefined)
    jest.spyOn(notification, 'error')
    await onSubmit({ name, officeIds, status })

    expect(notification.error).toHaveBeenCalled()
  })

  it('should show notification success', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    jest.spyOn(notification, 'success')
    await onSubmit({ name, officeIds, status })

    expect(notification.success).toHaveBeenCalled()
  })
})
