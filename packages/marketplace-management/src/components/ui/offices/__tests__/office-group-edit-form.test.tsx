import React, { MouseEvent } from 'react'
import OfficeGroupEditForm, {
  EditOfficeGroupSchema,
  handleDeleteGroup,
  handleOpenModal,
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
import { OfficeGroupModel } from '@reapit/foundations-ts-definitions'
import { toastMessages } from '../../../../constants/toast-messages'
import { OFFICE_IN_USE_ERROR, updateOfficeGroup } from '../../../../services/office'
import { useReapitGet } from '@reapit/use-reapit-data'

jest.mock('@reapit/utils-common', () => ({
  ...jest.requireActual('@reapit/utils-common'),
  fetcher: jest.fn(),
}))

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitUpdate: jest.fn(() => [null, null, jest.fn()]),
  useReapitGet: jest.fn(() => [{ data: [{ client: 'MOCK_CLIENT' }] }]),
}))

jest.mock('../../../../core/connect-session')
jest.mock('swr')
jest.mock('../../../../utils/use-org-id')
jest.mock('../../../../services/office', () => ({
  updateOfficeGroup: jest.fn(),
  OFFICE_IN_USE_ERROR: 'TEST_ERROR',
}))

const mockSWR = useSWR as jest.Mock
const mockUseReapitGet = useReapitGet as jest.Mock
const mockUpdateOfficeGroup = updateOfficeGroup as jest.Mock

mockSWR.mockReturnValue({
  data: mockOfficeList,
  error: {},
  mutate: jest.fn(),
})

const props = (): OfficeGroupEditFormProps => ({
  officeGroup: (mockOfficeGroups._embedded as OfficeGroupModel[])[0],
  offices: mockOfficeList._embedded as OfficeModel[],
  onComplete: jest.fn,
})

const mockResponse = 'success'

describe('OfficeGroupEditForm', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet.mockReturnValue([null, null, jest.fn()])
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
    mockUpdateOfficeGroup.mockReturnValueOnce(undefined)

    await onSubmit({ name, officeIds, status: true })

    expect(error).toHaveBeenCalledWith(toastMessages.FAILED_TO_EDIT_OFFICE_GROUP)
  })

  it('should display a different error for offices assigned error', async () => {
    mockUpdateOfficeGroup.mockReturnValueOnce(OFFICE_IN_USE_ERROR)

    await onSubmit({ name, officeIds, status: true })

    expect(error).toHaveBeenCalledWith(toastMessages.OFFICE_ALREADY_ASSIGNED_EDIT, 10000)
  })

  it('should correctly call success', async () => {
    mockUpdateOfficeGroup.mockReturnValueOnce(mockResponse)

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

describe('handleDeleteGroup', () => {
  it('should handle deleting a group', async () => {
    const deleteOfficeGroup = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const onComplete = jest.fn()
    const closeModal = jest.fn()

    const curried = handleDeleteGroup(deleteOfficeGroup, onComplete, closeModal)
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>

    await curried(event)

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(deleteOfficeGroup).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

describe('handleOpenModal', () => {
  it('should handle opening a modal', () => {
    const openModal = jest.fn()

    const curried = handleOpenModal(openModal)

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>

    curried(event)

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})
