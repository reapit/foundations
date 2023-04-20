import React from 'react'
import { fetcher } from '@reapit/utils-common'
import OfficeGroupCreate, { handleSwitchStep, onHandleSubmit } from '../office-group-create'
import Routes from '../../../../constants/routes'
import { toastMessages } from '../../../../constants/toast-messages'
import { useOrgId } from '../../../../utils/use-org-id'
import useSWR from 'swr'
import { mockOfficeList } from '../../../../services/__stubs__/offices'
import { OFFICE_IN_USE_ERROR } from '../../../../services/office'
import { render } from '../../../../tests/react-testing'

jest.useFakeTimers()
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
  useSWRConfig: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}))
jest.mock('@reapit/utils-common')
jest.mock('../../../../utils/prepare-options')
jest.mock('../../../../utils/use-org-id')
jest.mock('../../../../core/connect-session')

const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock
const mockUseOrgId = useOrgId as jest.Mock
const mockSWR = useSWR as jest.Mock

mockSWR.mockReturnValue({
  data: mockOfficeList,
})

describe('OfficeGroupCreate', () => {
  it('should match a snapshot', () => {
    mockSWR.mockReturnValue({
      data: mockOfficeList,
    })
    expect(render(<OfficeGroupCreate />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is no orgId', () => {
    mockUseOrgId.mockReturnValueOnce({ orgIdState: { ogId: null } })
    expect(render(<OfficeGroupCreate />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const success = jest.fn()
  const error = jest.fn()
  const name = 'Group name'
  const status = true
  const orgId = 'ORG1'
  const officeIds = 'OF1,OF2'
  const mutate = jest.fn()
  const navigate = jest.fn()
  const onSubmit = onHandleSubmit(navigate, orgId, mutate, success, error)

  it('should show notification error', async () => {
    mockedFetch.mockReturnValueOnce(undefined)

    await onSubmit({ name, officeIds, status })

    expect(error).toHaveBeenCalledWith(toastMessages.FAILED_TO_CREATE_OFFICE_GROUP)
  })

  it('should show a different notification error if an office is assigned', async () => {
    mockedFetch.mockReturnValueOnce(OFFICE_IN_USE_ERROR)

    await onSubmit({ name, officeIds, status })

    expect(error).toHaveBeenCalledWith(toastMessages.OFFICE_ALREADY_ASSIGNED_CREATE, 10000)
  })

  it('should show notification success', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)

    await onSubmit({ name, officeIds, status })

    jest.runAllTimers()
    expect(success).toHaveBeenCalledWith(toastMessages.CREATE_OFFICE_GROUP_SUCCESS)
    expect(navigate).toHaveBeenCalledWith(Routes.OFFICES_GROUPS)
  })
})

describe('handleSwitchStep', () => {
  const steps = ['1', '2', '3']
  const expectedResults = ['2', '3']
  steps.forEach((selectedStep, index) => {
    it(`should handle switching step for ${selectedStep}`, async () => {
      const trigger = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
      const setSelectedStep = jest.fn()

      const curried = handleSwitchStep(selectedStep, trigger, setSelectedStep)

      await curried()

      if (index < 2) {
        expect(setSelectedStep).toHaveBeenCalledWith(expectedResults[index])
      }
    })
  })
})
