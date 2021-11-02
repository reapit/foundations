import React from 'react'
import { fetcher } from '@reapit/utils-common'
import OfficeGroupEditForm, {
  EditOfficeGroupSchema,
  handleSetNewOptions,
  handleSetOptions,
  OfficeGroupEditFormProps,
  onHandleSubmit,
} from '../office-group-edit-form'
import { render } from '@testing-library/react'
import useSWR from 'swr'
import { mockOfficeList } from '../../../../services/__stubs__/offices'
import { mockOfficeGroups } from '../../../../services/__stubs__/office-groups'
import { UseFormGetValues } from 'react-hook-form'
import { prepareOfficeOptions } from '../../../../utils/prepare-options'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { OfficeGroupModel } from '../../../../types/organisations-schema'
import { toastMessages } from '../../../../constants/toast-messages'
import { OFFICE_IN_USE_ERROR } from '../../../../services/office'

jest.mock('@reapit/utils-common')
jest.mock('../../../../core/connect-session')
jest.mock('swr')

const mockSWR = useSWR as jest.Mock
const mockedFetch = fetcher as jest.Mock

mockSWR.mockReturnValue({
  data: mockOfficeList,
  error: {},
  mutate: jest.fn(),
})

const props = (): OfficeGroupEditFormProps => ({
  officeGroup: (mockOfficeGroups._embedded as OfficeGroupModel[])[0],
  offices: mockOfficeList._embedded as OfficeModel[],
  orgId: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
  onComplete: jest.fn,
})

jest.mock('../../../../core/connect-session')

const mockResponse = 'success'

describe('OfficeGroupEditForm', () => {
  it('should match a snapshot', () => {
    expect(render(<OfficeGroupEditForm {...props()} />)).toMatchSnapshot()
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

  it('should call error correctly', async () => {
    mockedFetch.mockReturnValueOnce(undefined)

    await onSubmit({ name, officeIds, status: true })

    expect(error).toHaveBeenCalledWith(toastMessages.FAILED_TO_EDIT_OFFICE_GROUP)
  })

  it('should display a different error for offices assigned error', async () => {
    mockedFetch.mockReturnValueOnce(OFFICE_IN_USE_ERROR)

    await onSubmit({ name, officeIds, status: true })

    expect(error).toHaveBeenCalledWith(toastMessages.OFFICE_ALREADY_ASSIGNED_EDIT)
  })

  it('should correctly call success', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)

    await onSubmit({ name, officeIds, status: true })

    expect(success).toHaveBeenCalledWith(toastMessages.CHANGES_SAVE_SUCCESS)
  })
})

describe('handleSetOptions', () => {
  it('should set options', () => {
    const officeGroup = (mockOfficeGroups._embedded as OfficeGroupModel[])[0]
    const offices = mockOfficeList._embedded as OfficeModel[]
    const setOptions = jest.fn()
    const reset = jest.fn()

    const curried = handleSetOptions(officeGroup, offices, setOptions, reset)

    curried()

    expect(reset).toHaveBeenCalledWith({
      name: officeGroup.name,
      officeIds: officeGroup.officeIds,
      status: officeGroup.status === 'active',
    })

    expect(setOptions).toHaveBeenCalledWith([])
  })
})

describe('handleSetNewOptions', () => {
  it('should set options', () => {
    const getValues = jest.fn(() => ({ officeIds: 'FCX' })) as unknown as UseFormGetValues<EditOfficeGroupSchema>
    const options = []
    const searchedOffices = mockOfficeList._embedded as OfficeModel[]
    const setOptions = jest.fn()

    const curried = handleSetNewOptions(getValues, options, searchedOffices, setOptions)

    curried()

    expect(setOptions).toHaveBeenCalledWith(prepareOfficeOptions(searchedOffices))
  })
})
