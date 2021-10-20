import React from 'react'
import { fetcher } from '@reapit/utils-common'
import { shallow } from 'enzyme'
import EditOfficeGroupForm, { EditOfficeGroupFormProps, onHandleSubmit } from '../office-group-edit-form'

jest.mock('@reapit/utils-common')
jest.mock('../../../../core/connect-session')
const mockedFetch = fetcher as jest.Mock

const filterProps = (): EditOfficeGroupFormProps => ({
  officeGroup: { id: 'GR1', name: 'Group Name', officeIds: 'OF1, OF2' },
  offices: [],
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onComplete: jest.fn,
})

jest.mock('../../../../core/connect-session')

const mockResponse = 'success'

describe('EditOfficeGroupForm', () => {
  it('should match a snapshot', () => {
    expect(shallow(<EditOfficeGroupForm {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const name = 'Group name'
  const onComplete = jest.fn()
  const success = jest.fn()
  const error = jest.fn()
  const orgId = 'ORG1'
  const officeGroup = { id: 'GR01', status: 'active' }
  const officeIds = 'OF1, OF2'
  const onSubmit = onHandleSubmit(onComplete, officeGroup, orgId, success, error)

  it('should return a function when executing', async () => {
    mockedFetch.mockReturnValueOnce(undefined)

    await onSubmit({ name, officeIds, status: true })

    expect(error).toHaveBeenCalled()
  })

  it('should return a function when executing', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)

    await onSubmit({ name, officeIds, status: true })

    expect(success).toHaveBeenCalled()
  })
})
