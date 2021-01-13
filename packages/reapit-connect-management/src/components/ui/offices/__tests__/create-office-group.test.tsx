import React from 'react'
import { shallow, mount } from 'enzyme'
import { notification } from '@reapit/elements'
import CreateOfficeGroupModal, {
  CreateOfficeGroupModalProps,
  onHandleSubmit,
  FormChangeEffect,
} from '../create-office-group'
import { data } from '../__stubs__/offices'
import { prepareOfficeOptions } from '../../../../utils/prepare-options'

const filterProps = (): CreateOfficeGroupModalProps => ({
  visible: true,
  setOpenCreateGroupModal: jest.fn(),
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onRefetchData: jest.fn(),
})

jest.mock('../../../../core/connect-session')
jest.mock('swr', () =>
  jest.fn(() => ({
    data,
  })),
)
jest.mock('../../../../utils/prepare-options')

jest.mock('formik', () => ({
  useFormikContext: jest.fn(() => ({ values: { officeIds: ['of01', 'of02'] } })),
}))

const mockResponse = 'success'

const mockFetchPromise = Promise.resolve({
  json: () => mockResponse,
})

describe('CreateOfficeGroupModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CreateOfficeGroupModal {...filterProps()} />)).toMatchSnapshot()
  })
  it('useEffect', () => {
    const Comp = () => {
      CreateOfficeGroupModal({ ...filterProps() })
      return <div />
    }
    mount(<Comp />)
    expect(prepareOfficeOptions).toHaveBeenCalled()
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

describe('CreateOfficeGroupModal', () => {
  it('should match a snapshot', () => {
    const setSelectedOffice = jest.fn()
    expect(shallow(<FormChangeEffect setSelectedOffice={setSelectedOffice} options={[]} />)).toMatchSnapshot()

    mount(<FormChangeEffect setSelectedOffice={setSelectedOffice} options={[]} />)
    expect(setSelectedOffice).toHaveBeenCalled()
  })
})
