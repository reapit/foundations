import React from 'react'
import { fetcher } from '@reapit/elements'
import { shallow, mount } from 'enzyme'
import { notification } from '@reapit/elements'
import CreateOfficeGroupModal, {
  CreateOfficeGroupModalProps,
  onHandleSubmit,
  FormChangeEffect,
} from '../create-office-group'

const filterProps = (): CreateOfficeGroupModalProps => ({
  visible: true,
  setOpenCreateGroupModal: jest.fn(),
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn(),
})

jest.mock('@reapit/elements')
jest.mock('../../../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

jest.mock('../../../../utils/prepare-options')

jest.mock('formik', () => ({
  useFormikContext: jest.fn(() => ({ values: { officeIds: ['of01', 'of02'] } })),
}))

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
    mockedFetch.mockReturnValueOnce(undefined)
    jest.spyOn(notification, 'error')
    await onSubmit({ name, officeIds })

    expect(notification.error).toHaveBeenCalled()
  })

  it('should show notification success', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    jest.spyOn(notification, 'success')
    await onSubmit({ name, officeIds })

    expect(notification.success).toHaveBeenCalled()
  })
})

describe('CreateOfficeGroupModal', () => {
  it('should match a snapshot', () => {
    const setSelectedOffice = jest.fn()
    expect(shallow(<FormChangeEffect setSelectedOffice={setSelectedOffice} options={[]} />)).toMatchSnapshot()

    mount(<FormChangeEffect setSelectedOffice={setSelectedOffice} options={[]} />)
    expect(setSelectedOffice).toHaveBeenCalled()
  })
})
