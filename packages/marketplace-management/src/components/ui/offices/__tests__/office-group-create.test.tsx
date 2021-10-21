import React from 'react'
import { fetcher } from '@reapit/utils-common'
import { shallow } from 'enzyme'
import OfficeGroupCreate, { onHandleSubmit } from '../office-group-create'
import { History } from 'history'
import Routes from '../../../../constants/routes'
import { toastMessages } from '../../../../constants/toast-messages'

jest.mock('@reapit/utils-common')
jest.mock('../../../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

jest.mock('../../../../utils/prepare-options')

jest.mock('formik', () => ({
  useFormikContext: jest.fn(() => ({ values: { officeIds: ['of01', 'of02'] } })),
}))

jest.mock('../../../../utils/use-org-id', () => ({
  useOrgId: () => ({
    orgIdState: {
      orgId: 'SOME_ID',
      orgName: 'SOME_NAME',
      orgClientId: 'SOME_CLIENT_ID',
    },
  }),
}))

describe('OfficeGroupCreate', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficeGroupCreate />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const success = jest.fn()
  const error = jest.fn()
  const name = 'Group name'
  const status = true
  const orgId = 'ORG1'
  const officeIds = 'OF1,OF2'
  const history = {
    push: jest.fn(),
  } as unknown as History
  const onSubmit = onHandleSubmit(history, orgId, success, error)

  it('should show notification error', async () => {
    mockedFetch.mockReturnValueOnce(undefined)

    await onSubmit({ name, officeIds, status })

    expect(error).toHaveBeenCalledWith(toastMessages.FAILED_TO_CREATE_OFFICE_GROUP)
  })

  it('should show notification success', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)

    await onSubmit({ name, officeIds, status })

    expect(success).toHaveBeenCalledWith(toastMessages.CREATE_OFFICE_GROUP_SUCCESS)
    expect(history.push).toHaveBeenCalledWith(Routes.OFFICES_GROUPS)
  })
})
