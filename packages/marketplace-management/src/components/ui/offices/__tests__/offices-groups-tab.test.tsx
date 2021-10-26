import * as React from 'react'
import { render } from '@testing-library/react'
import OfficesGroupsTab, {
  getOfficeQueryFromGroups,
  mergeOfficesGroups,
  onPageChangeHandler,
} from '../offices-groups-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import { OfficeGroupModel } from '../../../../types/organisations-schema'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { mockOfficeGroups } from '../../../../services/__stubs__/office-groups'
import useSWR from 'swr'
import { useOrgId } from '../../../../utils/use-org-id'
import { mockOfficeList } from '../../../../services/__stubs__/offices'

jest.mock('../../../../core/connect-session')
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/offices/groups' })),
}))
jest.mock('swr')
jest.mock('../../../../utils/use-org-id')

const mockSWR = useSWR as jest.Mock
const mockUseOrgId = useOrgId as jest.Mock

describe('OfficesGroupsTab', () => {
  it('should match a snapshot where there are office groups', () => {
    mockSWR.mockReturnValue({
      data: mockOfficeGroups,
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<OfficesGroupsTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there are no office groups', () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<OfficesGroupsTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where the office groups have no length', () => {
    mockSWR.mockReturnValue({
      data: {
        data: [],
      },
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<OfficesGroupsTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is no orgId', () => {
    mockSWR.mockReturnValue({
      data: mockOfficeGroups,
      error: null,
      mutate: jest.fn(),
    })

    mockUseOrgId.mockReturnValueOnce({ orgIdState: { orgId: null } })

    expect(render(<OfficesGroupsTab />)).toMatchSnapshot()
  })
})

describe('mergeOfficesGroups', () => {
  it('should merge office groups with offices', () => {
    const officeGroupModels = (mockOfficeGroups._embedded ?? []) as OfficeGroupModel[]
    const result = mergeOfficesGroups(mockOfficeList._embedded as OfficeModel[], officeGroupModels)

    const expected = officeGroupModels.map(model => ())
    const expected = [
      {
        ...officeGroupModels[0],
        offices: mockOfficeList._embedded,
      },
    ]
    expect(result).toEqual(expected)
  })
})

describe('getOfficeQueryFromGroups', () => {
  it('should get an office query from office groups', () => {
    const result = getOfficeQueryFromGroups(officeGroupsStub._embedded)
    const expected = '?id=SOME_ID&id=ANOTHER_ID'
    expect(result).toEqual(expected)
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenCalledWith(`${Routes.OFFICES_GROUPS}?pageNumber=2`)
  })
})
